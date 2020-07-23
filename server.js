// const express = require('express')
// const path=require('path')
// const fs=require("fs")
// const app = express()
 
// const PORT=process.env.PORT || 3000

// app.get('/', function (req, res) {
//     const filepath=path.resolve(__dirname,"./build","index.html")
//     fs.readFile(filepath,"utf8",(err,data) =>{
//         if(err){
//             return console.log(err)
//         }
//         data=data
//         .replace(/__TITLE__/g,"Category Page")
//         .replace(/__DESCRIPTION__/g,"Category Page Desc")
//     });
//   res.send(data)
// })
//  app.use(express.static(path.resolve(__dirname,"./build")))
//  app.listen(3000);
// app.listen(PORT,()=>{
//     console.log(`server is listening on port ${PORT}`)
// })

import MetaTagsServer from 'react-meta-tags/server';
import {MetaTagsContext} from 'react-meta-tags';

/* Import other required modules */
/*  some serve specific code */

app.use((req, res) => {
  //make sure you get a new metatags instance for each request
  const metaTagsInstance = MetaTagsServer();

  //react router match
  match({
    routes, location: req.url
  }, (error, redirectLocation, renderProps) => {
    let reactString;

    try{
      reactString = ReactDomServer.renderToString(
      <Provider store={store}> 
      {/*** If you are using redux ***/}
      {/* You have to pass extract method through MetaTagsContext so it can catch meta tags */}

        <MetaTagsContext extract = {metaTagsInstance.extract}>
          <RouterContext {...renderProps}/>
        </MetaTagsContext>
      </Provider>
      );
    }
    catch(e){
      res.status(500).send(e.stack);
      return;
    }

    //get all title and metatags as string
    const meta = metaTagsInstance.renderToString();

    //append metatag string to your layout
    const htmlStr = (`
      <!doctype html>
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          ${meta}
        </head>
        <body>
          <div id="content">
            ${reactString}
          </div>
        </body>
      </html>  
    `);

    res.status(200).send(layout);
  });
});