/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

 function getRandom() {
    return (Math.random() * (7 - 0) + 0);
}


var attendanceModel = (function() {

    var model = {
        studentsList = [],
        initStudentsList: initStudentsList
    }

    function initStudentsList(studentsList) {

        for (var i = studentsList.length - 1; i >= 0; i--) {
            studentsList[i].attendance = [];
            for (var j = 0; j < 7 ; j++) {
                studentsList[i][j] = 
            }
            studentsList[i]
        }
    }
    if (!localStorage.attendance) {

        console.log('Creating attendance records...');
        

        var nameColumns = $('tbody .name-col');
        var attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());


var studentsList = [
    {
        name: "Slappy the Frog"
    },
        {
        name: "Lilly the Lizard"
    },
        {
        name: "Paulrus the Walrus"
    },
        {
        name: "Gregory the Goat"
    },
        {
        name: "Adam the Anaconda"
    }
]
