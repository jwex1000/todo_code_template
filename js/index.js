$(document).ready(function() {
  AttachTaskListeners();
  AttachProjectIndexListeners();
  AttachSearchListener();
});

function AttachTaskListeners () {
  var tasks = $('.todo li');
  for (var i=0; i<tasks.length; i++) {
    var task = $(tasks[i]);
    $(task).on("click", function (e) {
      if (!$(e.target).hasClass("fui-document")) {
        $(e.target.closest("li")).toggleClass("todo-done");
      }
    });
  }
}

function AttachProjectIndexListeners () {
  var projects = $('.project-index li');
  for (var i=0; i<projects.length; i++) {
    var project = $(projects[i]);
    $(project).on("click", function (e) {
      SwitchProject($(e.target));
    })
  }
}

function SwitchProject (project) {
  var name = project.html();
  console.log(name);
  var headers = $('.project-header');
  for (var i=0; i<headers.length; i++) {
    var header = $(headers[i]);
    if (header.html() != name && name != "All") {
      header.closest('.project').slideUp();
    }
    else header.closest('.project').slideDown();
  }
}

function AttachSearchListener () {
  $('.todo-search-field').on("keyup", function(e) {
    var input = e.target.value;
    FilterTasks(input);
  });
}

function FilterTasks (filter) {
  var tasks = $('.task');
  for (var i=0; i<tasks.length; i++) {
    var task = $(tasks[i]);
    var name = $(task.find('.todo-name')).html();
    if (ContainsString(name, filter)) task.show();
    else task.hide();
  }
}

function ContainsString (string, substring) {
  return string.toLowerCase().indexOf(substring.toLowerCase()) >= 0;
}