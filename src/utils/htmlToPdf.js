import React from 'react';

import { jsPDF } from "jspdf";


export const  generatePDF = async(content) =>{
    const doc = new jsPDF('l', 'mm', [800, 630]);
    var htmlObject = document.createElement('div');
    htmlObject.style.width = '800px'
    htmlObject.style.display = 'flex'
    htmlObject.style.flexDirection = 'column'
    htmlObject.style.alignItems = 'center'
    htmlObject.style.justifyContent = 'center'
    htmlObject.innerHTML = content;
    doc.html(htmlObject, {
        callback: function (doc) {
          doc.save("rri-report.pdf");
        } ,x:0, y:10});
    // doc.save("a4.pdf");

}


export const getHtmlContent = (project_name, score)=>{
    const today = new Date()
    const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
    const color = score > 70 ?'#009447' : score > 50 ? '#ffb700' : '#ed0808' 
    return(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
        
        
        /* @import url('https://fonts.googleapis.com/css?family=Open+Sans|Pinyon+Script|Rochester'); */
        
        .cursive {
          font-family: 'Pinyon Script', sans-serif;
        }
        
        .sans {
          font-family: 'Open Sans', sans-serif;
        }
        
        .bold {
          font-weight: bold;
        }
        
        .block {
          display: block;
        }
        
        .underline {
          border-bottom: 1px solid #777;
          padding: 5px;
          margin-bottom: 15px;
        }
        
        .margin-0 {
          margin: 0;
        }
        
        .padding-0 {
          padding: 0;
        }
        
        .pm-empty-space {
          height: 40px;
          width: 100%;
        }
        
        body {
          padding: 20px 0;
          background: #ccc;
        }
        
        .pm-certificate-container {
          position: relative;
          width: 800px;
          height: 600px;
          background-color: #009347;
          padding: 30px;
          color: #333;
          font-family: 'Open Sans', sans-serif;
          box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        }
        
        .outer-border {
          width: 794px;
          height: 594px;
          position: absolute;
          left: 50%;
          margin-left: -397px;
          top: 50%;
          margin-top: -297px;
          border: 2px solid #fff;
        }
        
        .inner-border {
          width: 730px;
          height: 530px;
          position: absolute;
          left: 50%;
          margin-left: -365px;
          top: 50%;
          margin-top: -265px;
          border: 2px solid #fff;
        }
        
        .pm-certificate-border {
          position: relative;
          width: 720px;
          height: 520px;
          padding: 0;
          border: 1px solid #E1E5F0;
          background-color: rgba(255, 255, 255, 1);
          background-image: none;
          left: 50%;
          margin-left: -360px;
          top: 50%;
          margin-top: -260px;
        }
        
        .pm-certificate-block {
          width: 650px;
          height: 200px;
          position: relative;
          left: 50%;
          margin-left: -325px;
          top: 70px;
        }
        
        .pm-certificate-header {
          margin-bottom: 10px;
        }
        
        .pm-certificate-title {
          position: relative;
          top: 40px;
        }
        
        .pm-certificate-title h2 {
          font-size: 34px !important;
        }
        
        .pm-certificate-body {
          padding: 20px;
        }
        
        .pm-name-text {
          font-size: 20px;
        }
        
        .pm-earned {
          margin: 15px 0 20px;
        }
        
        .pm-earned-text {
          font-size: 20px;
        }
        
        .pm-credits-text {
          font-size: 15px;
        }
        
        .pm-course-title .pm-earned-text {
          font-size: 20px;
        }
        
        .pm-course-title .pm-credits-text {
          font-size: 15px;
        }
        
        .pm-certified {
          font-size: 12px;
        }
        
        .pm-certified .underline {
          margin-bottom: 5px;
        }
        
        .pm-certificate-footer {
          width: 650px;
          height: 100px;
          position: relative;
          left: 50%;
          margin-left: -325px;
          bottom: -105px;
        }
            
                   
            </style>
        </head>
        <body>
            <div class="container pm-certificate-container">
              <div class="outer-border"></div>
              <div class="inner-border"></div>
              
              <div class="pm-certificate-border col-xs-12">
                <div class="row pm-certificate-header">
                  <div class="pm-certificate-title cursive  col-xs-12 text-center">
                    <h2 style="padding-left: 10px;">Responsible Research an Innovation</h2>
                    <span class="pm-empty-space block underline"></span>
                  </div>
                </div>
          
                <div class="row pm-certificate-body">
                  
                  <div class="pm-certificate-block">
                      <div class="col-xs-12">
                        <div class="row">
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                          <div class="pm-certificate-name  margin-0 col-xs-8 text-center">
                            <span class="pm-name-text bold">${project_name}</span>
                          </div>
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                        </div>
                      </div>          
          
                      <div class="col-xs-12">
                        <div class="row">
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                          <div class="pm-earned col-xs-8 text-center">
                            
                            <span class="pm-credits-text block bold sans">RRI Index score: <span style="background-color: ${color}; color: #fff; padding: 4px; border-radius: 4px;">${score}</span>  </span>
                          </div>
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                          <div class="col-xs-12"></div>
                        </div>
                      </div>
                      
                      <div class="col-xs-12">
                        <div class="row">
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                          <div class="pm-course-title col-xs-8 text-center">
                            <span class="pm-earned-text block cursive"> To learn more about Responsible Reserach and Innovetaion </span>
                          </div>
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                        </div>
                      </div>
          
                      <div class="col-xs-12">
                        <div class="row">
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                          <div class="pm-course-title underline col-xs-8 text-center">
                            <span class="pm-credits-text block bold sans">Visit our website <a style="color: #009347;" href="https://rri.africa.cmu.edu">https://rri.africa.cmu.edu/rri</a> </span>
                          </div>
                          <div class="col-xs-2"><!-- LEAVE EMPTY --></div>
                        </div>
                      </div>
                  </div>       
                  
                  <div class="col-xs-12">
                    <div class="row">
                      <div class="pm-certificate-footer">
                          <div class="col-xs-4 pm-certified col-xs-4 text-center">
                            <span class="pm-credits-text block sans">Upanzi network / CMU Africa</span>
                            <!-- <span class="pm-empty-space block underline"></span> -->
                            
                          </div>
                          <div class="col-xs-4">
                          </div>
                          <div class="col-xs-4 pm-certified col-xs-4 text-center">
                            <span class="pm-credits-text block sans">Date Completed : ${date}</span>
                            <!-- <span class="pm-empty-space block underline"></span> -->
                            
                          </div>
                      </div>
                    </div>
                  </div>
          
                </div>
          
              </div>
            </div>
          </body>
        </html>
        `
    )
}