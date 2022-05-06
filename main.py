import json
import sys
from mitmproxy import http

def response(flow: http.HTTPFlow):
    if "nz.co.LanguagePerfect.Services.PortalsAsync.App.AppServicesPortal.GetQuestionsWithOptimisedMedia" in flow.request.url:
        handleResponse(flow.response)
        
def handleResponse(response):
    open('questions.json', 'w').close()
    with open('questions.json', 'w+') as outJson:
        json.dump(response.text , outJson)
        outJson.close()
    

    
