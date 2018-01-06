//Event Handler when the form is submitted
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// Adds a new issue [(e) = event]
function saveIssue(e) {
    // these values come from the form imputs in the index.html file
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueTitle = document.getElementById('issueTitleInput').value;
    //using the chance.js to generate a global unique identifier
    var issueId = chance.guid();
    //open is the initial status of the issue
    var issueStatus = 'open';
    
    //creates object with the variables above
    var issue = {
        id: issueId,
        status: issueStatus,
        description: issueDesc,
        severity: issueSeverity,
        title: issueTitle
    }
    
    console.log(issue);
    
    // checks if LocalStorage is empty 
    if (localStorage.getItem('issues') == null) {
        //creates array
        var issues = [];
        //inserts the new object 'issue' into empty array 'issues'
        issues.push(issue);
        //stores the array element into LocalStorage as a string
        localStorage.setItem('issues', JSON.stringify(issues));
    // if LocalStorage is NOT empty    
    } else {
        //inserts everything from local storage as JSON format into the 'issues' array
        var issues = JSON.parse(localStorage.getItem('issues'));
        //inserts the new object 'issue' into array 'issues'
        issues.push(issue);
        //stores back to LocalStorage as a string
        localStorage.setItem('issues', JSON.stringify(issues));
    }//end of if statement
    
    // Resets the form (clears any values from the form after it is submitted)
    document.getElementById('issueInputForm').reset();
    
    // Calls the function in order to display the new issue that was just created
    fetchIssues();
    
    //prevents the form from submitting, since we are getting the form values through another method
    e.preventDefault();
    
}//end of function saveIssue(e)


// Closes the issue
function setStatusClosed(id) {
    // retrieves everything from local storage as JSON format into the 'issues' array
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    //looks for 'id' of object that needs to be deleted
    for (i = 0; i < issues.length; i++){
        if (issues[i].id === id) {
            //changes the 'status' to closed
            issues[i].status = 'closed';
        }
    }//end of for (i = 0; i < issues.length; i++)
    
    //stores 'issues' array back to LocalStorage as a string
    localStorage.setItem('issues', JSON.stringify(issues));
    // displays the issues again, now updated
    fetchIssues();
}

// Opens the issue
function setStatusOpen(id) {
    // retrieves everything from local storage as JSON format into the 'issues' array
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    //looks for 'id' of object that needs to be deleted
    for (i = 0; i < issues.length; i++){
        if (issues[i].id === id) {
            //changes the 'status' to closed
            issues[i].status = 'open';
        }
    }//end of for (i = 0; i < issues.length; i++)
    
    //stores 'issues' array back to LocalStorage as a string
    localStorage.setItem('issues', JSON.stringify(issues));
    // displays the issues again, now updated
    fetchIssues();
}

// Deletes the issue
function deleteIssue(id) {
    // pop up alert to confirm if user wants to delete, returns boolean 'True' value if OK is pressed, otherwise, it returns a 'False' boolean value
    var result = confirm("Do you want to permanently delete this issue?");
    //if OK was pressed
    if (result) {
        // retrieves everything from local storage as JSON format into the 'issues' array
        var issues = JSON.parse(localStorage.getItem('issues'));

        //looks for 'id' of object that needs to be deleted
        for (i = 0; i < issues.length; i++){
            if (issues[i].id === id) {
                //changes the 'status' to closed
                issues.splice(i, 1);
            }
        }//end of for (i = 0; i < issues.length; i++)

        //stores 'issues' array back to LocalStorage as a string
        localStorage.setItem('issues', JSON.stringify(issues));
        // displays the issues again, now updated
        fetchIssues();
    }
}


//==================Main Page==================//
// Fetches ALL the issues from LocalStorage to display on the main page
function fetchIssues() {
    // retrieves everything from local storage as JSON format into the 'issues' variable
    var issues = JSON.parse(localStorage.getItem('issues'));
    // the document section where the results are going to appear
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    // loops through each element in the array, each element representing a single issue
    for(i = 0; i < issues.length; i++) {
        //assignes the values of a single issue from the array 'issues'
        var id = issues[i].id;
        var status = issues[i].status;        
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var title = issues[i].title;
        
        //display one single issue in every loop
        issuesList.innerHTML +=
        '<div class="card">'+
          '<div class="card-header">'+
            '<p>' + status + '</P>'+
          '</div>'+
          '<div class="card-block">'+
            '<h4 class="card-title">' + title +'</h4>'+
            '<p class="card-text">' + desc + '</p>' +
            '<a href="" onclick="setStatusClosed(\'' +id+ '\')" class="btn btn-warning">Close</a>'+
            '<a href="" onclick="setStatusOpen(\'' +id+ '\')" class="btn btn-success">Open</a>'+            
            '<a href="" onclick="deleteIssue(\'' +id+ '\')" class="btn btn-danger">Delete</a>'+
            '<a href="edit.html" onclick="editIssue(\'' +id+ '\')" class="btn btn-info">Edit</a>'+
          '</div>'+
        '</div> '+
        '<br>';           
    }//end of for(i = 0; i < issues.length; i++)
    
}//end of function


//==================Open Issues==================//
// Fetches Open issues from LocalStorage to display on the open.html page
function fetchOpenIssues() {
    // retrieves everything from local storage as JSON format into the 'issues' variable
    var issues = JSON.parse(localStorage.getItem('issues'));
    // the document section where the results are going to appear
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    // loops through each element in the array, each element representing a single issue
    for(i = 0; i < issues.length; i++) {
        //assignes the values of a single issue from the array 'issues'
        var id = issues[i].id;
        var status = issues[i].status;        
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var title = issues[i].title;
        
        //if status of an issue is 'open'
        if (status === 'open') {
        //display one single issue in every loop
        issuesList.innerHTML +=
        '<div class="card">'+
          '<div class="card-header">'+
            '<p>' + status + '</P>'+
          '</div>'+
          '<div class="card-block">'+
            '<h4 class="card-title">' + title +'</h4>'+
            '<p class="card-text">' + desc + '</p>' +
            '<a href="" onclick="setStatusClosed(\'' +id+ '\')" class="btn btn-warning">Close</a>'+
            '<a href="" onclick="setStatusOpen(\'' +id+ '\')" class="btn btn-success">Open</a>'+            
            '<a href="" onclick="deleteIssue(\'' +id+ '\')" class="btn btn-danger">Delete</a>'+
            '<a href="edit.html" onclick="editIssue(\'' +id+ '\')" class="btn btn-info">Edit</a>'+
          '</div>'+
        '</div> '+
        '<br>'; 
        } else {
            //skips only one loop iteration, using 'break' would exit the whole function
            continue;
        }
    }//end of for(i = 0; i < issues.length; i++)
    
}//end of function


//==================Closed Issues==================//
// Fetches Closed issues from LocalStorage to display on the closed.html page
function fetchClosedIssues() {
    // retrieves everything from local storage as JSON format into the 'issues' variable
    var issues = JSON.parse(localStorage.getItem('issues'));
    // the document section where the results are going to appear
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    // loops through each element in the array, each element representing a single issue
    for(i = 0; i < issues.length; i++) {
        //assignes the values of a single issue from the array 'issues'
        var id = issues[i].id;
        var status = issues[i].status;        
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var title = issues[i].title;
        
        //if status of an issue is 'closed'
        if (status === 'closed') {
        //display one single issue in every loop
        issuesList.innerHTML +=
        '<div class="card">'+
          '<div class="card-header">'+
            '<p>' + status + '</P>'+
          '</div>'+
          '<div class="card-block">'+
            '<h4 class="card-title">' + title +'</h4>'+
            '<p class="card-text">' + desc + '</p>' +
            '<a href="" onclick="setStatusClosed(\'' +id+ '\')" class="btn btn-warning">Close</a>'+
            '<a href="" onclick="setStatusOpen(\'' +id+ '\')" class="btn btn-success">Open</a>'+            
            '<a href="" onclick="deleteIssue(\'' +id+ '\')" class="btn btn-danger">Delete</a>'+
            '<a href="edit.html" onclick="editIssue(\'' +id+ '\')" class="btn btn-info">Edit</a>'+
          '</div>'+
        '</div> '+
        '<br>';
        } else {
            //skips only one loop iteration, using 'break' would exit the whole function
            continue;
        }
    }//end of for(i = 0; i < issues.length; i++)
    
}//end of function
