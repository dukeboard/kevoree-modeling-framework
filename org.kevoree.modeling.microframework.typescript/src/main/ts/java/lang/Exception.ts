///<reference path="Throwable.ts"/>
class Exception extends Throwable {

    private message:string;

    constructor(message:string) {
        super();
        this.message = message;
    }

    printStackTrace() {
        console.error(this.message);
    }

}