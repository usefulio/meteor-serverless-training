import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import get from 'lodash/get';
Template.zip.onCreated(function(){
  this.details = new ReactiveVar();
  this.zipcode = new ReactiveVar();
});
Template.zip.helpers({
  details: function() {
    return Template.instance().details.get();
  },
  zipcode: function() {
    return Template.instance().zipcode.get();
  }
});
Template.zip.events({
  'click button'(event, template) {
    const zipcode = parseInt(template.find("#zipcode").value);
    check(zipcode, Number);
    Meteor.call("getWeather",zipcode, function(err, res){console.log(res);
      if(err){
        alert(err.reason);
      }else{
        template.details.set(res);
        template.zipcode.set(zipcode);
      }
    });
    
  },
});





