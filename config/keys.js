

if(process.env.NODE_ENV ==='production'){
    module.exports=require('./prod.js');

} else {
    module.exports=require('./dev.js');
}

//sendgrid=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