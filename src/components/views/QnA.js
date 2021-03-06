
import React, {useEffect, useRef, useState} from "react";
import {useHistory, useParams, useLocation} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/QnA.scss";
import {Button} from 'components/ui/Button';
import {api, handleError} from "../../helpers/api";
import QnASession from "../../models/QnASession";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import faker from "@faker-js/faker";
import { Spinner } from "components/ui/Spinner";
import { getDomain } from "helpers/getDomain";
import Questions from "models/Questions";
import _ from "lodash";
import { useTable } from 'react-table'
import PropTypes from "prop-types";

const AnswerSummary = ( { answeredQuestions } ) => {

    // const data = React.useMemo(() => answeredQuestions
    // , [])

    const data = answeredQuestions;

    const columns = React.useMemo(() => [
        {Header: "Question", accessor: "question"},
        {Header: "Answer", accessor: "answer"}
    ], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })
   
    
   
      return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...restColumn } = column.getHeaderProps();
                    return (
                      <th key={key} {...restColumn}>
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps}>
            {rows.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr key={key} {...restRowProps}>
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td key={key} {...restCellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
}

AnswerSummary.propTypes = {
    answeredQuestions: PropTypes.array
  };

const QnA = ( { props }) => {
    const history = useHistory();
    const [session, setSession] = useState(new QnASession());
    const syncSession = useRef(new QnASession());
    const isProvider = useRef(null);
    const [questions, setQuestions] = useState(null);
    const questionsRef = useRef(null)
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const location = useLocation();
    const [providerFlag, setProviderFlag] = useState(null)
    const [informedEndFlag, setInformedEndFlag] = useState(false);
    const [didExit, setDidExit] = useState(false);

    // const [inSession, setInSession] = useState(false)
    // initialize empty SockJS and StompClient
    let [socket, setSocket] = useState(null);
    let [stompClient, setStompClient] = useState(null);
    const placeId = useRef(null);

    // get this from localStorage later
    // let userId = `User${Math.random()}`; 
    let userId = localStorage.getItem('loggedInUserId');
    // Change this later => inferred on user B's side
    // session.turn = userId;

    // use params
    const { qaSessionId , eventId } = useParams();

    function onConnected() {

        console.log("Connection successful")

        // what to do when connected

        // subscribe to onAnswer received

        // not sure if we need to unsubscribe
        // if (currentSubscription) {
        //     currentSubscription.unsubscribe();
        //   }

        // suscribe to topic
        stompClient.subscribe(`/channel/${qaSessionId}`, onAnswer);

        const topic = `/app/qna/${qaSessionId}`;

        // inform that you have joined to session
        stompClient.send(`${topic}/addUser`,
            {},
            JSON.stringify({sender: userId, type: 'JOIN'})
        );
        
    }

    function onError(error) {

        console.log("Connection failed")

        // what to do when connection fails
    }

    function onAnswer(payload) {
        // what to do when a message is received
        let message = JSON.parse(payload.body)

        // check if joined (if joined => then send the QnA Session Object & update it into the dynamic QnA Card)
        if(message.type === "JOIN" && message.sender !== userId) {
            // The session OBJECT HERE MUST NOT BE NULL!
            // identify yourself as starter (after someone else joined) and pass to joined user
            let session = syncSession.current
            console.log(`Plane object: ${JSON.stringify(session)}`)
            session.starter = !session.starter ? userId : session.starter;
            session.userA = !session.userA ? userId : session.userA;
            session.currQ = !session.currQ ? selectedQuestion : session.currQ;
            console.log(`Prepare to provide the following object: ${JSON.stringify(session)}`)
            sendMessage(session)
            setSession(session)
            // syncSession = session
            // debug
            console.log(`${message.sender} joined the session`);
            // send the object, or modify internal state...

        }


        // check if type Message (QnA Object) => update the QnASession Object
        if(message.type === "CHAT") {
            // get everybody onto the same page
            let sessObj = JSON.parse(message.content)
            // set and allow react to effect changes onto UI
            console.log("Successfully received object from other user:")
            console.log(JSON.stringify(sessObj))

            // when the object contains a starter other than me, 
            // has a turn of null 
            // and a filled currQ, assign turn to myself
            // if(sessObj.starter !== userId && !sessObj.turn && sessObj.currQ) {
            if(message.sender !== userId && !sessObj.turn && sessObj.currQ) {
                console.log("Called on turn")
                sessObj.turn = userId
                // setSession(sessObj)
                // syncSession.current = new QnASession(sessObj)
            }

            // in the other cases the session sorts itself out?!

            syncSession.current = new QnASession(sessObj)

            setSession(new QnASession(sessObj))

            const answered = _.map(syncSession.current.starter === userId
                            ? syncSession.current.answeredQsB 
                            : syncSession.current.answeredQsA,
                            (o) => o.question)

            console.log("--- ANSWEREDS ---")
            console.log(JSON.stringify(answered))
            
            setQuestions(_.filter(questionsRef.current, (o) => !answered.includes(o.question)))
            // setQuestions(["X", "Y", "Z"])

            console.log("---- QUESTIONS ----")
            console.log(JSON.stringify(questions))

            console.log("PROCESSED SESSION STATE:")
            console.log(JSON.stringify(sessObj))

            console.log("PROCESSED SESSION STATE (REF):")
            console.log(JSON.stringify(syncSession.current))
        }

        // check if type Exit => close the session and redirect back to event page
        // if(message.type === "LEAVE") {
        //     doExit() 
        // }

    }

    useEffect(() => {
        console.log(`Set question set: ${questions}`)

        if(questions != null && questions.length <= 0 && informedEndFlag == false && session.turn == userId) {
            alert("You have no questions to ask anymore. Therefore the session automatically ends after you've answered your question.")
            setInformedEndFlag(true);
        }

    }, [questions])

    function connect(sessionid) {

        // assign SockJS
        var socket = new SockJS(`${getDomain()}/ws`);
        setSocket(socket)

        // assign StompClient
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
        setStompClient(stompClient)

        // connect to the WebSocket RT Server

    }

    // const syncSession = useCallback(() => {
    //     // validate based on the CURRENT value of 'memberId'
    //     // this function gets updated whenever memberId is updated,
    //     // so we know it will be the most recent id you just set
    //     return session;
    // }, [session]);


    useEffect( () => {
        async function fetchData() {
            try {
                // fetch the possible questions from the server
                // const response = await api.get(`/users/${userId}/profile`); //why?
                // check if the user is provider or not

                try {
                    // Return more details if the requesting user is the actual user.
                    const response = await api.get(`/places/events/${eventId}`);
            
                    // Get the returned users and update the state.
                    isProvider.current = JSON.stringify(response.data.providerId) == userId;

                    placeId.current = response.data.placeId;

                    console.log("SETTING PROVIDER FLAG")
                    JSON.stringify(response.data.providerId) == userId ? console.log("true") : console.log("false")

                    setProviderFlag(JSON.stringify(response.data.providerId) == userId);

            
                    // This is just some data for you to see what is available.
                    // Feel free to remove it.
                    console.log('request to:', response.request.responseURL);
                    console.log('status code:', response.status);
                    console.log('status text:', response.statusText);
                    console.log('requested data:', response.data);

                  } catch (error) {
                    console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                    console.error("Details:", error);
                    // alert("Something went wrong while fetching the users! See the console for details.");
                    throw new Error("Propagate error to next level.")
                  }

                // set the questions accordingly => form intersection with already asked questions

                if(isProvider.current) {
                    questionsRef.current = Questions.getQuestionsToApplicant() 
                    setQuestions(Questions.getQuestionsToApplicant())
                } else if(isProvider.current == false) {
                    questionsRef.current = Questions.getQuestionsToProvider() 
                    setQuestions(Questions.getQuestionsToProvider())
                } else {
                    throw new Error("It couldn't be determined whether your provider or applicant")
                }

                // put this in here, since we don't want to retrigger with every state change
                // this drops user directly into the session if he has the given path variable
                if(qaSessionId) {
                    // if qaSessionId is set, connect to the server with the designated id
                    connect(qaSessionId);
                }
                

                // get related event info (from props param) => not really necessary...

                // Create new blank session object on creation
                // setSession(new QnASession(response.data));

                // console.log(response)
            } catch (error) {

                alert(`Something went wrong while initialising or joining the QnA session: ${error.message}`);

            }
        }

        fetchData()
        
    }, [location.key])


    const notifyCounterparty = async (qaSessionId) => {
        try {
            const response = await api.get(`/users/${localStorage.getItem('loggedInUserId')}/profile`)

            const response_event = await api.get(`/places/events/${eventId}`);

            let sendToUser = response_event.data.providerId;

            if(localStorage.getItem('loggedInUserId') == response_event.data.providerId) {
                sendToUser = response_event.data.confirmedApplicant
            }

            const message = JSON.stringify({
                messageContent: `${ response.data.username } invites you to a QnA Session. Click here to join!`,
                link: `/qa/${eventId}/${qaSessionId}`
            })

            const requestBody = JSON.stringify({message});
            const response2 = await api.post(`/users/${sendToUser}/notifications`, requestBody);
            console.log(response2);


        } catch (error) {
            alert(`Something went wrong during sending notifications: \n${handleError(error)}`);
        }
    }

    function sendMessage(sessionInstance) {

        const topic = `/app/qna/${qaSessionId}`;

        console.log("Trigger: Sendmessage")
        // send the message with the STOMP client of the mutated QnAObject
        if(stompClient) {
            console.log("StompClient Active")
            var chatMessage = {
                sender: userId,
                content: JSON.stringify(sessionInstance),
                type: 'CHAT'
            };
            stompClient.send(`${topic}/sendMessage`, {}, JSON.stringify(chatMessage));
        }
    }


    // function sendLeaveMessage() {
    //     const topic = `/app/qna/${qaSessionId}`;
    //     if(stompClient) {
    //         console.log("StompClient Active")
    //         var chatMessage = {
    //             sender: userId,
    //             content: "void",
    //             type: 'LEAVE'
    //         };
    //         stompClient.send(`${topic}/sendMessage`, {}, JSON.stringify(chatMessage));
    //     } 
    // }

    useEffect(() => {
        console.log("UPDATED SESSION STATE")
        console.log(session)
    }, [session])

    // useEffect(() => {
    //     if(questions.length == 0) {
    //         alert("You have no questions to ask anymore. Therefore the session automatically ends after you've answered your question.")
    //     }
    // }, [questions])

    useEffect(() => {
        console.log("New question selected.");
    }, [selectedQuestion])


    // useEffect(() => {
    //     console.log(`QnASession Object Changed: ${JSON.stringify(session)}`)
    //     // setSyncSession(session)
    // }, [session])

    const submitQuestion = () => {
        // when the question is selected and we submit it
        syncSession.current.currQ = selectedQuestion
        // set the turn to zero, so the other party can take it!
        syncSession.current.turn = null
        
        // trigger and then pass session instance to other party.
        sendMessage(syncSession.current)


    }

    const submitAnswer = (answer) => {
        // move currQ to answered (if starter != userId => on B stack)
        if(userId !== syncSession.current.starter) {
            syncSession.current.answeredQsB.push(
                {
                    question: syncSession.current.currQ,
                    answer: answer
                }
            )
        } else {
            syncSession.current.answeredQsA.push(
                {
                    question: syncSession.current.currQ,
                    answer: answer
                }
            )
        }
        // set currQ to null
        syncSession.current.currQ = null

        // trigger sendmessage here
        sendMessage(syncSession.current)

        if(informedEndFlag) {
            doExit();
            setDidExit(true)
        }

    }

    const doExit = () => {
        // trigger client exit message => TODO: Broadcast to WS Server
        if(didExit) {
            return;
        }

        console.log("Want to exit")

        syncSession.current.starter = null;

        syncSession.current.currQ = null;


        sendMessage(syncSession.current)

        setSession(syncSession.current)

        stompClient.disconnect()
        // sendLeaveMessage();
        // push to the exit session
        // disconnect from stompClient => TODO
    }

    useEffect(() => {
        console.log("PROVIDER FLAG SET")
        providerFlag ? console.log("true") : console.log("false")
    }, [providerFlag])

    // let { userId = 1 } = useParams();

    // ? (<AnswerSummary answeredQuestions={syncSession.current.answeredQsA} />)
    // (<span>{JSON.stringify(syncSession.current.answeredQsA)}<span/>)

    return (
        <BaseContainer alerts={[{
            message: `This QnA Session is related to event id: ${eventId}`,
            action: true,
            buttonMsg: "Checkout",
            callback: () => {window.open(`/eventprofile/${placeId.current}/${eventId}`, "_blank")}
        }]}>
            <div className= "qna card" >
                <div className = "qna card-title">
                    <h1>QnA Session</h1>
                    <h3>With the { (providerFlag != null && providerFlag != undefined) ? (providerFlag == false ? "provider." : "accepted applicant.") : "other user." }</h3>
                </div>
                {/* <div className= "qna card-header" >
                    <img className = "qna image" src="/qna.jpeg" alt="user qna img" />
                </div> */}
                <div className= "qna card-body" >
                    {/* If the session is not initialized yet (qnasessionID == null), 
                        simply show question form and submit functionality, 
                        then redirect to page with QAsessionID, also send a message to the other user with the link 
                        (he can otherwise not access the page) */}
                    { qaSessionId ?
                    session.answeredQsA.length > 0 && session.userA != userId 
                    ? (<><h3>Summary</h3><h5>Questions answered by the other user.</h5><AnswerSummary className="qna answer-table" answeredQuestions={_.uniqBy(session.answeredQsA, 'question')} /></>)
                    : session.answeredQsB.length > 0 && session.userA == userId 
                    ? (<><h3>Summary</h3><h5>Questions answered by the other user.</h5><AnswerSummary classname="qna answer-table" answeredQuestions={_.uniqBy(session.answeredQsB, 'question')} /></>)
                    : (<></>)
                    : (<></>)
                    }
                    { !qaSessionId && questions ? 
                    (<>
                        <h5>Start by asking a question to the other user:</h5>
                        <form>
                            <select onChange={(e) => setSelectedQuestion(e.target.value)}>
                            <option value="" >None selected</option>
                            { questions.map((q) =>
                             (<option key={q.id} value={q.question}>{q.question}</option>)
                            )}
                            </select>
                            {/* This submission is handled further down. */}
                        </form>
                        <br />
                    </>): (<></>)
                    }
                    {/* If it's the turn of the logged in user, show AskQuestion interface 
                    and last answered question from counterparty, also show the submit button */}
                    {/* Otherwise show the loader */}
                    { qaSessionId && questions && session.turn === userId && !session.currQ && session.starter != null ? 
                        (<>
                        {/* { session.starter === userId && session.answeredQsB.length > 0 ? 
                            (
                                // push to beginning of array
                                <>
                                <div className="qna question-answered">XXX{ session.answeredQsB[0].question }</div>
                                <div className="qna answer">{ session.answeredQsB[0].answer }</div>
                                </>
                            ) : session.answeredQsA.length > 0 ? (
                                <>
                                <div className="qna question-answered">XXX{ session.answeredQsA[0].question }</div>
                                <div className="qna answer">{ session.answeredQsA[0].answer }</div>
                                </> 
                            ) : (<></>)
                        } */}
                        <h5>Ask a question to the other user:</h5>
                        <form>
                            <select onChange={(e) => setSelectedQuestion(e.target.value)}>
                            <option value="" default>None selected</option>
                            { questions.map((q) =>
                             (<option key={q.id} value={q.question}>{q.question}</option>)
                            )}
                            </select>
                            <Button
                                width="70%"
                                onClick={(e) => {e.preventDefault(); submitQuestion()}}
                                disabled={(selectedQuestion == "")||(!selectedQuestion)}
                                >
                                    Ask 
                            </Button>
                        </form>

                        </>)
                        : qaSessionId && questions && session.turn === userId && session.currQ ?
                        (
                            <>
                            {/* This functionality has been replaced by a tabular view */}
                            {/* { session.starter === userId && session.answeredQsB.length > 0 ? 
                            (
                                // push to beginning of array
                                <>
                                <div className="qna question-answered">
                                    { session.answeredQsB[session.answeredQsB.length - 1].question }
                                </div>
                                <div className="qna answer">
                                    { session.answeredQsB[session.answeredQsB.length - 1].answer }
                                </div>
                                </>
                            ) : session.answeredQsA.length > 0 ? (
                                <>
                                <div className="qna question-answered">
                                    { session.answeredQsA[session.answeredQsA.length - 1].question }
                                </div>
                                <div className="qna answer">
                                    { session.answeredQsA[session.answeredQsA.length - 1].answer }
                                </div>
                                </> 
                            ) : (<></>)
                            } */}
                            <h5>The other user has asked the following question:</h5>
                            {/* // Add a button which will take the answered question and add it to the users list.
                            // If he's not the starter => add it to answered Bs. */}
                            <h2>{ session.currQ }</h2>
                            <Button
                                width="70%"
                                onClick={() => {submitAnswer("Yes"); console.log("Yes pressed")}}
                                >
                                    Yes
                            </Button>
                            <Button
                            width="70%"
                            onClick={() => {submitAnswer("No"); console.log("No pressed")}}
                            >
                                No
                            </Button>
                            <Button
                            width="70%"
                            onClick={() => {submitAnswer("Skip"); console.log("Skip pressed")}}
                            >
                                Skip
                            </Button>
                            </>
                        )
                        : qaSessionId && syncSession.current.starter == null ?
                        (<>
                            <br />
                            <br />
                            <span>
                                This QnA Session has ended, since a user left or there were no more questions to ask. Click on Start new session, to start a new session for this event.
                            </span>
                            <Button onClick={() => history.push(`/qa/${eventId}`)}>Start new session</Button>
                         </>)
                        : !qaSessionId ? (<></>)

                        :(<><h5>Waiting for response by the other user.</h5><span><Spinner /></span></>)
                    }
                <div className= "qna card-footer" >
                { !qaSessionId ?
                        (<Button
                                width="100%"
                                onClick={() => { 
                                    // generate session id
                                    const qaSessionId = faker.datatype.uuid();
                                    // also send notification

                                    // push to the session
                                    history.push({pathname: `/qa/${eventId}/${qaSessionId}`})

                                    syncSession.current.starter = userId;

                                    notifyCounterparty(qaSessionId);

                                    // console.log(`${qaSessionId}`)
                                    // connect(qaSessionId)
                                }}
                                disabled={(selectedQuestion == "")||(!selectedQuestion)}
                            >
                                Start QnA
                        </Button>)
                        :   
                        (<Button 
                                width="100%"
                                onClick={(e) => {e.preventDefault(); doExit(); history.push(`/`)}}
                            >
                                Exit
                       </Button>)
                    }
                    </div>
                 </div>
            </div>
        </BaseContainer>
    );


}

export default QnA;