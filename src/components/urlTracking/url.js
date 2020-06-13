/* global chrome */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetURL() {
    const [urlList, setUrlList] = useState([])
    const [unproductiveDomains, setUnproductiveDomains] = useState([])
    const [submitValue, setSubmitValue] = useState()

    console.log('the websites you want to avoid')
    console.log(unproductiveDomains);
    console.log('the websites you are currently on')
    console.log(urlList)

    const handleSubmit = (event) => {
        if (!unproductiveDomains.includes(submitValue) && submitValue!=null) {
            setUnproductiveDomains(unproductiveDomains.concat(submitValue));
        }
        setSubmitValue(null);
        event.preventDefault();
    }

    const handleChange = (event) => {
        setSubmitValue(event.target.value);
    }

    const pollSites = () => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            const url = new URL(tabs[0].url);
            const domain = url.hostname;
            if (!urlList.includes(domain)) {
                setUrlList(urlList.concat(domain))
            }
        })
    }

    useEffect(() => {
        setInterval(() => pollSites(), 100)
    }, []);

    return(
        <form onSubmit={handleSubmit}>
        <label>
          What URLs do you find unproductive?
          <input type="text" value={submitValue} onChange={handleChange} />
        </label>
      </form>
    )
}