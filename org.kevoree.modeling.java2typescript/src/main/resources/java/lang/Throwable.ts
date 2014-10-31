
class Throwable {

    private message : string;

    constructor(message : string) {
        this.message = message;
    }

    printStackTrace() {
        console.error(this.message);
    }
}