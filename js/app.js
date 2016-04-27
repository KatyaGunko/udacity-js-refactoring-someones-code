/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

 function getRandom() {
    return Math.round(Math.random() * (1 - 0) + 0);
}


var attendanceModel = (function() {

    var model = {
        studentsList: [],
        initStudentsList: initStudentsList
    }

    function initStudentsList(studentsList) {

        for (var i = studentsList.length - 1; i >= 0; i--) {
            studentsList[i].attendance = [];
            studentsList[i].total = 0;
            for (var j = 0; j < 7 ; j++) {
                studentsList[i].attendance[j] = getRandom();
                studentsList[i].total += studentsList[i].attendance[j];
            } 
        }

        model.studentsList = studentsList;
    }

    return model
}());

var attendanceController = (function() {

    var controller = {
        init: init,
        getStudentsList: getStudentsList
    }

    function init() {
        attendanceModel.initStudentsList(studentsList);
        attendanceView.init();
    }

    function getStudentsList() {
        return attendanceModel.studentsList;
    }

    return controller;
}());

var attendanceView = (function() {

    var view = {
        init: init,
    }

    var tbody = document.getElementById('students-table');

    function init() {

        var studentsList = attendanceController.getStudentsList();

        for (var i = studentsList.length - 1; i >= 0; i--) {
            render(studentsList[i]);
        }
    }

    function render(student) {
        var template = '<tr class="student">';
            template += '<td class="name-col">' + student.name + '</td>';

            for (var i = 0; i < student.attendance.length; i++) {
                template += student.attendance[i] ? '<td class="attend-col"><input type="checkbox" checked="checked"></td>' : '<td class="attend-col"><input type="checkbox"></td>'
            }  
             
            template += '<td class="missed-col">' + student.total + '</td></tr>';
        
        tbody.innerHTML += template;
    }

    function setIventHeldlers() {
        var checkboxes = document.getElementsByTagName('input');

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i]
        }
    }

    return view;

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
];


attendanceController.init();

/* STUDENT APPLICATION */
// $(function() {
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');

//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function() {
//             var studentRow = $(this).parent('tr'),
//                 dayChecks = $(studentRow).children('td').children('input'),
//                 numMissed = 0;

//             dayChecks.each(function() {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });

//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function() {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function() {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');

//             newAttendance[name] = [];

//             $allCheckboxes.each(function() {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
// }());
