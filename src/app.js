
const express = require('express')
const app = express()
const port = process.env.port||3000

//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})
//app.get('/about', (req, res) => {
//    res.send('this is data in about bage')
//  })

 // app.get('/service', (req, res) => {
 //   res.send('this is data in service page')
 // })
  const path = require('path')
/////////////////////////////////////////////////////////////////////

app.set('view engine', 'hbs');
const viewsDirectory = path.join (__dirname , "../temp1/views" )
      app.set( "views" , viewsDirectory)



      var hbs = require ('hbs')

      const partialsPath = path.join (__dirname , "../temp1/partials")

      hbs.registerPartials(partialsPath)
    
      const publicDirectory =  path.join(__dirname , '../public')
      app.use (express.static (publicDirectory))



      app.get('/' , (req , res) => {
        res.render('index' , {
            title: "HOME",
            desc : "Welcome to my weather app"
        })
    })

//app.get('/Weather' , (req,res)=>{
 //     res.render('Weather' , {
 //       country: "Egypt",
 //       latitude: "27.56574543",
 //       logitude:"29.42038543",
 //       weather:"rainy",
 //       temperature:"20"
        
 //     })
//})
////////////////////////////////////////////////////////////////
const geocode = require('./tools/geocode.js')
const forecast = require('./tools/forecastFile')

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address
            })
        })
    })
})

/////////////////////////////////////////////////////////////////////////////

  app.get('*' , (req , res)=> {
     res.send('404 Page Not Founded')
  })

///////////////////////////////////////////////////////////////////////////
  

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
    

