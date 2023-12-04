import React from "react";
import { Link } from "react-router-dom";
import { InnerWrapper, OuterWrapper } from "./GlobalStyles";
import './NotFound.css';

const NotFound = () => {

    return(
        <OuterWrapper>
            <InnerWrapper>
                <section className="not-found-section">
                    <p>Sorry, nothing here :/</p>
                    <section className="link-section">
                        <p>
                        <Link to="/login">Back to login</Link>
                        </p>
                    </section>
                </section>
            </InnerWrapper>
        </OuterWrapper>
    );
}

export default NotFound;