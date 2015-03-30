!function(){"use strict";function config($urlProvider,$locationProvider){$urlProvider.otherwise("/"),$locationProvider.html5Mode({enabled:!1,requireBase:!1}),$locationProvider.hashPrefix("!")}function run(){FastClick.attach(document.body)}function TasksController($scope,$stateParams,$state,$controller){angular.extend(this,$controller("DefaultController",{$scope:$scope,$stateParams:$stateParams,$state:$state})),$scope.editMode=!1,$scope.showstatus="incomplete",$scope.showtag={},$scope.tasks=JSON.parse(localStorage.getItem("saved_tasks")),("undefined"==typeof $scope.tasks||null===$scope.tasks)&&($scope.tasks=[]),$scope.allTags=JSON.parse(localStorage.getItem("all_tags")),("undefined"==typeof $scope.allTags||null===$scope.allTags)&&($scope.allTags=[]),$scope.CreateTask=function(title,body,tags){var task={};task.title=title,task.body=body,task.status="incomplete",task.color="",tags=tags.replace(/, /g,","),task.tags=tags.split(","),$scope.allTags=$scope.allTags.concat(task.tags),$scope.allTags=$scope.allTags.filter(function(element,index){return $scope.allTags.indexOf(element)==index}),task.id=Date.now(),$scope.tasks.push(task),localStorage.setItem("all_tags",JSON.stringify($scope.allTags)),localStorage.setItem("saved_tasks",JSON.stringify($scope.tasks))},$scope.DeleteTask=function(id){var these_tags;$scope.tasks=$scope.tasks.filter(function(element){return element.id!=id?element:void(these_tags=element.tags)});for(var tag=0;tag<these_tags.length;tag++)for(var check_tag=these_tags[tag],i=0;i<$scope.tasks.length;i++){var this_task=$scope.tasks[i],tag_on_other=-1==this_task.tags.indexOf(check_tag)?!1:!0;tag_on_other||($scope.allTags=$scope.allTags.filter(function(element){return element!=check_tag}))}localStorage.setItem("all_tags",JSON.stringify($scope.allTags)),localStorage.setItem("saved_tasks",JSON.stringify($scope.tasks))},$scope.UpdateTags=function(id){$scope.tasks.filter(function(element){if(element.id==id){var tags=element.tags.replace(/, /g,",");return element.tags=tags.split(","),element}return element})},$scope.UpdateTasks=function(){$scope.allTags=[];for(var i=0;i<$scope.tasks.length;i++)$scope.allTags=$scope.allTags.concat($scope.tasks[i].tags);$scope.allTags=$scope.allTags.filter(function(element,index){return $scope.allTags.indexOf(element)==index}),localStorage.setItem("all_tags",JSON.stringify($scope.allTags)),localStorage.setItem("saved_tasks",JSON.stringify($scope.tasks))},$scope.SetTaskColor=function(id,color){$scope.tasks.filter(function(element){return element.id==id?(element.color=color,element):element});localStorage.setItem("saved_tasks",JSON.stringify($scope.tasks))},$scope.SetTaskStatus=function(id,status){$scope.tasks.filter(function(element){return element.id==id?(element.status=status,element):element});localStorage.removeItem("saved_tasks"),localStorage.setItem("saved_tasks",JSON.stringify($scope.tasks)),$scope.tasks=JSON.parse(localStorage.getItem("saved_tasks"))}}angular.module("application",["ui.router","ngAnimate","foundation","foundation.dynamicRouting","foundation.dynamicRouting.animations"]).config(config).run(run),config.$inject=["$urlRouterProvider","$locationProvider"],angular.module("application").controller("TasksController",TasksController),TasksController.$inject=["$scope","$stateParams","$state","$controller"]}();