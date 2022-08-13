## Usage
### Requirements
    - mitmproxy - https://mitmproxy.org/   
    - Python
    - NodeJS
### Setup and usage
    0.  Install mitmproxy at https://mitmproxy.org/ 
    1.  To set up the proxy (the thing that will intercept the request). Go to settings > Network & Internet > Proxy
    2.  Scroll down to Manual Proxy Settings and enable "Use a proxy server",
    3.  In the address bar, set the address to "http://localhost" and the port to "8080" and click the Save button.
    4.  Start the proxy by navigating to the code directory in a command prompt and typing "mitmweb -s main.py"
    5.  This should open a webpage. Click on the file tab in the top left corner to activate the dropdown menu. 
        Alternatively navegate to "http://mitm.it/" in your browser
    6.  In the dropdown menu. Click Install Certificates.
    7.  If you have set up the proxy correctly, you should see a page saying "Install mitmproxy's Certificate Authority"
    8.  Install the correct certificate for your operating system, and follow the instructions on the page.
    9.  Now when you access a webpage it should load correctly and you should be able to see all HTTPS requests and responses.
    10. Once you have opened the task you need answers for, grab the answers by navigating to the code directory in a command prompt
        and typing "node ."
    11. This should print most of the answers in the terminal.
    12. Have fun :)
    


## Background

While inspecting https traffic between the education perfect an client and server, I found out a few interesting things.

    1.  Education Perfect HTTPS requests are all sent to 
        https://services.educationperfect.com/json.rpc

    2.  Education Perfect relies on this api for almost 
        everything you see on the page; eg. The Background, Your Classes
        But this is understandable because almost everything you see
        is dependent on their database.

    3.  Education Perfect sends the questions through
        an HTTPS POST Request. This is unusual as I would have assumed
        that questions were loaded from the webpage. But on second thought now
        I realies that it is much more efficiant then writing whole webpages for
        the sole purpose of 1 task out of thousands.

    4.  (This is the big one), Education Perfect, in the aforementioned discovery, not only
        sends question details, but also the answers. This is big. One would have assumed that
        question results were processed on their server, but they seem to have opted for the 
        faster, more vulnerable, and less resource intensive method of client side validation.

            

## Opportunity

This shocking vulnerability provides opportunity for me, a student who hates
the platform more then React.JS, to unleash hell on Alex Burke. And thus the crusade begins.
### The idea
The best way to take advantage of this vulnerability is to intercept the request, and await the 
response. When the request is answered, we read it and get information from the JSON response
and display it somewhere. We could also make a local api that can be interacted with by
a client to create a bot.

## Request/Response Example
The requests are all sent to services.educationperfect.com/json.rpc
This particular request is asks for `nz.co.LanguagePerfect.Services.PortalsAsync.App.AppServicesPortal.GetQuestionsWithOptimisedMedia`



Example Request 
```
POST /json.rpc?target=nz.co.LanguagePerfect.Services.PortalsAsync.App.AppServicesPortal.GetQuestionsWithOptimisedMedia HTTP/2
Host: services.educationperfect.com
Content-Length: 413
Sec-Ch-Ua: "(Not(A:Brand";v="8", "Chromium";v="99"
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36
Sec-Ch-Ua-Platform: "Windows"
Content-Type: application/json; charset=UTF-8
Accept: */*
Origin: https://app.educationperfect.com
Sec-Fetch-Site: same-site
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://app.educationperfect.com/
Accept-Encoding: gzip, deflate
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8

{
    "id":1200,
    "method":"nz.co.LanguagePerfect.Services.PortalsAsync.App.AppServicesPortal.GetQuestionsWithOptimisedMedia",
    "params":[
        3809951535595918,
        [
            8243877
    ]]}
```
This is the request that Education Perfect sends to the API when loading a task. This specific task is on business.

When the request is sent (With a correct authentication id) The Response should look similar to the one below

Example Response
```{
    "jsonrpc": "2.0",
    "result": {
        "Questions": [
            {
                "ID": 8243877,
                "ContentID": 8243877,
                "ConceptID": -1,
                "ConceptDescription": "",
                "Status": 2,
                "Notes": "",
                "MilestoneRuleID": 4,
                "Definition": {
                    "Title": "Introduction: Learning Objectives",
                    "TextTemplate": "### **Welcome to this lesson on @@be7500@Local Businesses!@@**\n\nBy the end of this lesson you should be able to:\n\n * @@48927c@**Describe**@@ the **factors that contribute to the success** of a business.\n * @@3770C7@**Identify**@@ how those **factors affect a specific business.**\n\n[image url=\"https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321.jpg\" width=\"473\" height=\"350\"]",
                    "TextFormat": {
                        "Alignment": "center",
                        "FontSize": "medium",
                        "Width": "normal"
                    },
                    "ExplanationTemplate": "",
                    "ExplanationFormat": {
                        "Alignment": "center",
                        "FontSize": "medium",
                        "Width": "normal"
                    },
                    "Variables": [],
                    "Components": [],
                    "TimerSeconds": 120,
                    "MarkingCriteria": null,
                    "QuestionReviewState": 0,
                    "TypeCode": "INFO"
                },
                "Editable": false
            }
        ],
        "OptimisedMedia": [
            {
                "ID": 597558,
                "MediaID": 130099,
                "Response": "{ \"width\": \"960\", \"height\": \"710\", \"type\": \"image/jpeg\", \"default\":true }",
                "URL": "https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321-optimised.jpg",
                "BaseURL": "https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321.jpg",
                "Status": 3
            },
            {
                "ID": 597559,
                "MediaID": 130099,
                "Response": "{ \"width\": \"400\", \"height\": \"295\", \"type\": \"image/jpeg\" }",
                "URL": "https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321-400.jpg",
                "BaseURL": "https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321.jpg",
                "Status": 3
            },
            {
                "ID": 597560,
                "MediaID": 130099,
                "Response": "{ \"width\": \"200\", \"height\": \"147\", \"type\": \"image/jpeg\" }",
                "URL": "https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321-200.jpg",
                "BaseURL": "https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321.jpg",
                "Status": 3
            },
            {
                "ID": 597561,
                "MediaID": 130099,
                "Response": "{ \"width\": \"800\", \"height\": \"591\", \"type\": \"image/jpeg\" }",
                "URL": "https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321-800.jpg",
                "BaseURL": "https://www.languageperfect.com/media/content/French/1506895212.023311g/1506895213417-58048618639321.jpg",
                "Status": 3
            }
        ],
        "FailedQuestionIDs": [],
        "Success": true,
        "Fault": "",
        "FaultTrackingGuid": null,
        "FaultSeverity": 0
    },
    "id": 8148
}
```

## Roadmap

- Begin


