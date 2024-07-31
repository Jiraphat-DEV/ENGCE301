var mysql = require('mysql');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

/*
async function getMovieList() {

    var Query;
    var pool  = mysql.createPool(config);
    
    return new Promise((resolve, reject) => {

       //Query = `SELECT * FROM movies WHERE warehouse_status = 1 ORDER BY CONVERT( warehouse_name USING tis620 ) ASC `;
         Query = `SELECT * FROM movies`;
 
         pool.query(Query, function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                pool.end();
                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    data: results,
                });   
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found',
                });
            }

        });

    });
    

}
*/

async function getMovieList() {

    var Query;
    var pool  = mysql.createPool(config);
    
    return new Promise((resolve, reject) => {

       //Query = `SELECT * FROM movies WHERE warehouse_status = 1 ORDER BY CONVERT( warehouse_name USING tis620 ) ASC `;
         Query = `SELECT * FROM movies`;
 
         pool.query(Query, function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                pool.end();
                return resolve(results);   
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found',
                });
            }

        });

    });
    

}


async function getMovieSearch(search_text) {

    var Query;
    var pool  = mysql.createPool(config);
    
    return new Promise((resolve, reject) => {

        Query = `SELECT * FROM movies WHERE title LIKE '%${search_text}%'`;
 
         pool.query(Query, function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                pool.end();
                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    data: results,
                });   
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found',
                });
            }
        });
    });
}

async function deleteMovieByTitle(title) {
    var pool = mysql.createPool(config);
    
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM movies WHERE title = ?`;
        console.log(title)
        pool.query(query, [title], function (error, results, fields) {
            if (error) {
                pool.end();
                return reject({
                    statusCode: 500,
                    returnCode: 12,
                    message: 'An error occurred',
                    error: error,
                });
            }

            if (results.affectedRows > 0) {
                pool.end();
                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    message: 'Movie deleted successfully',
                });
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found with that title',
                });
            }
        });
    });
}

async function postMovie(p_title,p_genre,p_director,p_release_year) {

    var Query;
    var pool  = mysql.createPool(config);
    
    return new Promise((resolve, reject) => {

        //Query = `SELECT * FROM movies WHERE title LIKE '%${search_text}%'`;

        var post  = {
            title: p_title, 
            genre: p_genre,
            director: p_director,
            release_year: p_release_year
        };

        console.log('post is: ', post); 

     
        Query = 'INSERT INTO movies SET ?';

        pool.query(Query, post, function (error, results, fields) {
            if (error) {
                pool.end();
                console.log(error)
                return reject({
                    statusCode: 500,
                    returnCode: 12,
                    message: 'An error occurred',
                    error: error,
                });
            }

            if (results.affectedRows > 0) {
                pool.end();
                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    message: 'Movie list was inserted',
                });
            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'No movie found with that title',
                });
            }
        });
    });
}

module.exports.MovieRepo = {
    getMovieList: getMovieList,
    getMovieSearch: getMovieSearch,
    deleteMovieByTitle:deleteMovieByTitle,
    postMovie: postMovie,
    
};