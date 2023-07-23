import React from 'react';
import { Link } from 'react-router-dom';
import "./FooterComponent.css"


function FooterComponent() {
    return (
        <footer className='footer'>
            <br />
            <br />
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', }}>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <h4>About Me</h4>
                    <br />
                    <Link to={{ pathname: "https://c-eatmon-port.onrender.com/" }}
                        target='_blank' id='about-me-links'>Portfolio Page</Link>
                    <br />
                    <Link to={{ pathname: "https://github.com/ChrisE1911" }}
                        target='_blank' id='about-me-links'>Github</Link>
                    <br />
                    <Link to={{ pathname: "https://www.linkedin.com/in/christopher-eatmon-b6a0aa17b" }}
                        target='_blank' id='about-me-links'>LinkedIn</Link>
                </div>
                <div>
                    <h4>Group Work</h4>
                    <br />
                    <Link to={{ pathname: "https://midcupid-no60.onrender.com/" }}
                        target='_blank' id='about-me-links'>MidCupid</Link>
                </div>
                <div>
                    <h4>Other Projects</h4>
                    <br />
                    <Link to={{ pathname: "https://eternalnote.onrender.com/" }}
                        target='_blank' id='about-me-links'>Eternal Note</Link>
                </div>
            </div>
            <br />
            <div className='footer-text' style={{paddingBottom: '1vh', marginLeft: '10vw'}}>
                <p>© 2023 Rendezvous. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default FooterComponent;
