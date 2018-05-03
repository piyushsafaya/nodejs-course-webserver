const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper("getCurrentYear", () =>
    {
        return new Date().getFullYear();
    }

)

hbs.registerHelper("screamIt", (text) =>
    {
        return text.toUpperCase();
    }

)

app.set('view engine','hbs');


app.use((request,response,next) =>

{
    var timestamp = new Date().toString();
    var log = timestamp=":"+request.method;
    fs.appendFile('server.log',log+'\n',(err) => {

        if(err) {
            console.log('unable to append');
        }
    }
 
);
    next();
}
)

app.use((request,response,next) => {

    response.render('maintenance.hbs');
   
}

);

app.use(express.static(__dirname +'/public'));

app.get('/', (request,response) => {

    response.render('home.hbs',
    {
        pageTitle: "Home page",
        welcomeMsg : "scream it2",
        

    }


);

}


);

app.get('/about', (request,response) => {

    response.render('about.hbs',
    {
        pageTitle: "About Page new",
        currentYear: new Date().getFullYear()

    }

);
}
);

app.get('/bad', (request,response) => {

    response.send(
    {
        errorMessage : "something went wrong",
    }


    );
}
);



app.listen(3000);