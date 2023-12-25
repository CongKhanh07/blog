const path = require('path');
const express = require('express');
const morgan = require('morgan');


//override
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const app = express();

//Import function
const route = require('./routes/index.js');
const db = require('./config/db/index.js');

//Custom Middleware
const sortMiddleware = require('./app/middlewares/SortMiddleware.js')
app.use(sortMiddleware)

//Connect to db
//db.connect();

app.use(methodOverride('_method'))
//Use static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body chưa tích hợp middleware => dùng để xử lý dữ liệu từ form submit lên
app.use(express.urlencoded());

//Gửi bởi bằng XMLHttpRequest, fetch, axios
app.use(express.json())

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'handlebars', 
    handlebars.engine({ 
        defaultLayout: 'main',
        helpers: {
            sum: (a,b) => a + b,
            sort: (field, sort) => {

                const icons = {
                    default: '<i class="fa-solid fa-sort"></i>',
                    desc: '<i class="fa-solid fa-arrow-down-wide-short"></i>',
                    asc: '<i class="fa-solid fa-arrow-up-short-wide"></i>'
                }

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'default'
                }

                let icon = icons['default']
                let type = types['default']

                if(sort.column === field) {
                    icon = icons[sort.type]
                    type = types[sort.type]
                    return `<a href="?_sort&column=${field}&type=${types[sort.type]}">${icon}</a>`
                }

                return `<a href="?_sort&column=${field}&type=${type}">${icon}</a>`
            }
        }
    })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

//Routes init
route(app);

app.listen(3000);
