var attendanceModel = (function() {

    var model = {
        studentsList: [],
        initStudentsList: initStudentsList
    }

    function initStudentsList(studentsList) {

        for (var i = 0; i < studentsList.length ; i++) {
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

        for (var i = 0; i < studentsList.length ; i++) {
            render(studentsList[i]);
        }
        setIventHeldlers();
    }

    function render(student) {
        var template = '<tr class="student">';
            template += '<td class="name-col">' + student.name + '</td>';

            for (var i = 0; i < student.attendance.length; i++) {
                template += student.attendance[i] ? '<td class="attend-col' + 'attend-col' + i + '"><input type="checkbox" checked="checked"></td>' : '<td class="attend-col"><input type="checkbox"></td>'
            }  
             
            template += '<td class="missed-col total">' + student.total + '</td></tr>';
        
        tbody.innerHTML += template;
    }

    function setIventHeldlers() {
        var tr = document.getElementsByTagName('tr');
        var studentsList = attendanceController.getStudentsList();

        for (var i = 1; i < tr.length; i++) {
            var checkboxes = tr[i].getElementsByTagName('input');

            for (var j = 0; j < checkboxes.length; j++) {
                checkboxes[j].onchange = checkboxClicked.bind(studentsList[i - 1]);
            }
        }
    }

    function checkboxClicked(e) {
        if ( e.target.checked ) {
            ++this.total
        } else {
            --this.total;
        }

        rerenderTotals();
    }

    function rerenderTotals() {
        var studentsList = attendanceController.getStudentsList();

        var totalsCols = document.getElementsByClassName('total');

        for (var i = 0; i < studentsList.length; i++) {
            totalsCols[i].innerHTML = studentsList[i].total;
        }
    }

    return view;

}());

function getRandom() {
    return Math.round(Math.random() * (1 - 0) + 0);
}

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