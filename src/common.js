/**
 * Created by zhuqizhong on 16-5-13.
 */
// var _ = require('underscore');
// var Rebus = require('./core/Rebus');
// var CONST = require( './core/constValues');
module.exports.uploadFiles = function (response, postdata,files) {

    var data = $.parseJSON(response.responseText);

    files.forEach(function (item) {
        if(item.file&&item.url){

            var dataForm = new FormData();
            dataForm.append('oper', 'edit');
            dataForm.append('id', data.id || data.uuid || data._id);
            if(data.parentId){
                dataForm.append('parentId', data.parentId);
            }
            var fileExists = false;
            if(_.isArray(item.file)){
                item.file.forEach(function (fl) {
                    if(fl.files.length > 0){
                        fileExists = true;
                        dataForm.append(fl.id, fl.files[0]);
                    }

                })
            }
            else{
                if(item.file.files){
                    fileExists = true;
                    dataForm.append(item.file.id, item.file.files[0]);
                }

            }

            if(fileExists){

                $.ajax(item.url, {
                    data:dataForm,
                    cache: false,
                    contentType: false,
                    type:"POST",
                    processData: false,
                    success : function(data) {

                    }
                })
            }

        }

    })

    return [true, '', data];
}