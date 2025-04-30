class APPERORR extends Error{
    constructor(){
        super();
    }
    create(message,statuscode,statustext){
        this.message=message;
        this.statuscode=statuscode;
        this.statustext=statustext;
        return this;
    }
}
module.exports= new APPERORR();