
import React, {useCallback, useEffect, useRef, useState} from "react";
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


const QnA = ( { props }) => {
    const history = useHistory();
    const [session, setSession] = useState(new QnASession());
    const syncSession = useRef(new QnASession());
    const [questions, setQuestions] = useState(null)
    const [selectedQuestion, setSelectedQuestion] = useState("Do you like UZH?");
    const location = useLocation();
    // const [inSession, setInSession] = useState(false)
    // initialize empty SockJS and StompClient
    let [socket, setSocket] = useState(null);
    let [stompClient, setStompClient] = useState(null);

    // get this from localStorage later
    // let userId = `User${Math.random()}`; 
    let userId = `User${localStorage.getItem('loggedInUserId')}`;
    // Change this later => inferred on user B's side
    // session.turn = userId;

    // use params
    const { qaSessionId } = useParams();

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

        const topic = `/app/chat/${qaSessionId}`;

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

            console.log("PORCESSED SESSION STATE:")
            console.log(JSON.stringify(sessObj))

        }

        // check if type Exit => close the session and redirect back to event page
        // TODO: Fix
        // if(message.type === "LEAVE") {
        //     doExit() 
        // }

    }

    function connect(sessionid) {

        // assign SockJS
        var socket = new SockJS('http://10.211.55.4:8080/ws');
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
                setQuestions([
                    {
                        id: 1,
                        question: "Do you like Pizza?"
                    },
                    {
                        id: 2,
                        question: "Should I bring some food?"
                    },
                    {
                        id: 3,
                        question: "Are you single?"
                    }
                ])

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

                // history.push(`/profileedit/${ userId }`);
            } catch (error) {
                alert(`Something went wrong during the login: \n${handleError(error)}`);
            }
        }

        fetchData()
        
    }, [location.key])

    function sendMessage(sessionInstance) {

        const topic = `/app/chat/${qaSessionId}`;

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
    }

    const doExit = () => {
        // trigger client exit message => TODO: Broadcast to WS Server
        console.log("Want to exit")
        // push to the exit session
        history.push(`/qa/1`)
        // disconnect from stompClient => TODO
        stompClient.disconnect()
    }

    // let { userId = 1 } = useParams();

    // const toEdit = () => {
    //     history.push(`/profileedit/${ userId }`)
    // }

    return (
        <BaseContainer>
            <div className= "qna card" >
                {/* <div className= "qna card-header" >
                    <img className = "qna image" src="/qna.jpeg" alt="user qna img" />
                </div> */}
                <div className= "qna card-body" >
                    {/* If the session is not initialized yet (qnasessionID == null), 
                        simply show question form and submit functionality, 
                        then redirect to page with QAsessionID, also send a message to the other user with the link 
                        (he can otherwise not access the page) */}
                    { !qaSessionId && questions ? 
                    (<>
                        <form>
                            <select onChange={(e) => setSelectedQuestion(e.target.value)}>
                            { questions.map((q) =>
                             (<option key={q.id} value={q.question}>{q.question}</option>)
                            )}
                            </select>
                            {/* This submission is handled further down. */}
                        </form>
                    </>): (<></>)
                    }
                    {/* If it's the turn of the logged in user, show AskQuestion interface 
                    and last answered question from counterparty, also show the submit button */}
                    {/* Otherwise show the loader */}
                    { qaSessionId && questions && session.turn === userId && !session.currQ ? 
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
                        <form>
                            <select onChange={(e) => setSelectedQuestion(e.target.value)}>
                            { questions.map((q) =>
                             (<option key={q.id} value={q.question}>{q.question}</option>)
                            )}
                            </select>
                            <Button
                                width="70%"
                                onClick={() => {submitQuestion(); console.log("Asked question")}}
                                >
                                    Ask 
                            </Button>
                        </form>

                        </>)
                        : qaSessionId && questions && session.turn === userId && session.currQ ?
                        (
                            <>
                            { session.starter === userId && session.answeredQsB.length > 0 ? 
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
                            }
                            <h5>This is the answering interface</h5>
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
                        : (<span><Spinner /></span>)
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
                                    history.push({pathname: `/qa/1/${qaSessionId}`})

                                    // console.log(`${qaSessionId}`)
                                    // connect(qaSessionId)
                                }}
                            >
                                Start QA
                        </Button>)
                        :   
                        (<Button 
                                width="100%"
                                onClick={() => doExit()}
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