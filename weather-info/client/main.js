import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
const check = require('check');
Template.zip.events({
  'click button'(event, template) {
    const zipcode = template.find("#zipcode").value;
    check(zipcode, Number);
    Meteor.call("getWeather",zipcode, function(err, res){
      if(err){
        alert(err.reason);
      }else{
        const result = JSON.parse(res.content);
        const weatherDeatils = result.message.data;
        var arrDetails = [];
        for (var key in weatherDeatils) arrDetails.push({name:key,value:weatherDeatils[key]});
        template.details.set(arrDetails);
        template.zipcode.set(zipcode);
      }
    });
    
  },
});
Template.zip.helpers({
  details: function() {
    return Template.instance().details.get();
  },
  zipcode: function() {
    return Template.instance().zipcode.get();
  }
});
Template.zip.onCreated(function(){
  this.details = new ReactiveVar();
  this.zipcode = new ReactiveVar();
});



