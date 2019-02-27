// obtain a JWT-enabled version of request
var request = require('google-oauth-jwt').requestWithJWT();

// my version of request
var requestDownload = require('request');
requestDownload = require('google-oauth-jwt').requestWithJWT(requestDownload);

// var requestDownload = require('google-oauth-jwt').requestWithJWT();
var fs = require('fs');
var url = require('url');

request({
  url: 'https://www.googleapis.com/drive/v2/files',
  jwt: {
    // use the email address of the service account, as seen in the API console
    email: '626903815443-bppj44t9hgb1pvrsqdq6bi4pstfl82ld@developer.gserviceaccount.com',
    // use the PEM file we generated from the downloaded key
    keyFile: 'APIProject.pem',
    // specify the scopes you wish to access - each application has different scopes
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  }
}, function (err, res, body) {

	// For each file, check to see if it is a google spreadsheet
	//   mimeType = application/vnd.google-apps.spreadsheet
	//   If found, then download the file as excel
	//   If not found, go to the next file

	//console.log(JSON.parse(body));

	var files = JSON.parse(body);
	console.log('Listing Files');
	var iCount = 1;
	for(var i=0; i< files.items.length; i++)
	{
//		console.log(files.items[i].title);
//		console.log(files.items[i].mimeType);
//		console.log(files.items[i].id);
//		console.log(typeof files.items[i].exportLinks === 'undefined');

		if ( typeof files.items[i].exportLinks !== 'undefined' )
		{
//		console.log('Export Links:');
		for(var link in files.items[i].exportLinks)
			{
			// application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
//			if (link === 'text/csv')
//				{
//				console.log(link);
//				console.log(files.items[i].exportLinks[link]);  // export link for the file
//				download_file_httpget(files.items[i].exportLinks[link], files.items[i].title + '.csv');
//				}
			// application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
			if (link === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
				{
				console.log('File #' + iCount + '  ' + files.items[i].title );
				iCount++;
				console.log(link);
				console.log(files.items[i].exportLinks[link]);  // export link for the file
				download_binaryfile_httpget(files.items[i].exportLinks[link], files.items[i].title, files.items[i].title + '.xlsx');
				}

			}
		}
		// application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
	}

});

// Function to download file as TEXT/CSV
var download_file_httpget = function(file_url, filename) {

requestDownload({
  url: file_url,
  jwt: {
    // use the email address of the service account, as seen in the API console
    email: '626903815443-bppj44t9hgb1pvrsqdq6bi4pstfl82ld@developer.gserviceaccount.com',
    // use the PEM file we generated from the downloaded key
    keyFile: 'APIProject.pem',
    // specify the scopes you wish to access - each application has different scopes
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  }
}, function (err, res, body) {
	if (err)
	{
	console.log('ERROR *****************************************');
		console.log(err);
		}
	else
	{
	// var file_name = url.parse(file_url).pathname.split('/').pop();
	var file = fs.createWriteStream('~/csvConverter/downloads/' + filename );
	file.write(body);
	file.end();
	console.log(filename + ' downloaded to downloads');
	}
} );

};

var download_binaryfile_httpget = function(file_url, title, filename) {

// Append a file with a title to filename listing
var sanitize = require('sanitize-filename');
var filename_to_use = sanitize(filename);

var sLogInfo = filename_to_use + ' :: ' + title + '\n';
var fsLog = require('fs');
fsLog.appendFile('~/csvConverter/filelog.log', sLogInfo, function(err) {
	if (err) throw err;
	});

requestDownload({
  url: file_url,
  encoding: null,
  jwt: {
    // use the email address of the service account, as seen in the API console
    email: '626903815443-bppj44t9hgb1pvrsqdq6bi4pstfl82ld@developer.gserviceaccount.com',
    // use the PEM file we generated from the downloaded key
    keyFile: 'APIProject.pem',
    // specify the scopes you wish to access - each application has different scopes
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  }
}, function (err, res, body) {
	if (err)
	{
	console.log('ERROR *****************************************');
		console.log(err);
		}
	else
	{
	var buffer = new Buffer(body);
	// var file_name = url.parse(file_url).pathname.split('/').pop();
	var file = fs.createWriteStream('~/csvConverter/downloads/' + filename_to_use );
	file.write(buffer);
	file.end();
	console.log(filename_to_use + ' downloaded to downloads');
	}
} );

};
