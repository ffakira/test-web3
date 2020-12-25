export default class CrudMethods {
    private $createBtn: HTMLElement = <HTMLElement> document.getElementById('createBtn');
    private $readBtn: HTMLElement = <HTMLElement> document.getElementById('readBtn');
    private $editBtn: HTMLElement = <HTMLElement> document.getElementById('editBtn');
    private $deleteBtn: HTMLElement = <HTMLElement> document.getElementById('deleteBtn');
    private $createResult: HTMLElement = <HTMLElement> document.getElementById('create-result');
    private $readResult: HTMLElement = <HTMLElement> document.getElementById('read-result');
    private $tsxHash: HTMLElement = <HTMLElement> document.getElementById('tsx-hash');
    private $getName: HTMLInputElement = <HTMLInputElement> document.getElementById('getName');
    private $getId: HTMLInputElement = <HTMLInputElement> document.getElementById('getId');

    private accounts!: Array<string>;
    private crud!: any;

    constructor(_accounts: Array<string>, _crud: any) {
        this.accounts = _accounts;
        this.crud = _crud;
    }

    private createBtn(): void {
        let self = this;
        this.$createBtn.addEventListener('click', function(_event: Event) {
            _event.preventDefault();
            let name: string = self.$getName.value;

            self.crud.methods.create(name).send({from: self.accounts[0]}).then(function(_result: any) {
                self.$createResult.innerHTML = `New user ${name} succesfully created`;
                self.$tsxHash.innerHTML = `TSX: ${_result.transactionHash}`;
                self.$getName.innerHTML = '';
            }).catch(function(_err: any) {
                console.log(_err);
                self.$createResult.innerHTML = `[Error]: ${_err.message}`;
            });
        });
    }

    private readBtn(): void {
        let self = this;
        this.$readBtn.addEventListener('click', function(_event: Event) {
            _event.preventDefault();
            let id: string = self.$getName.value;

            self.crud.methods.read(id).call().then(function(_result: any) {
                console.log(_result);
                self.$createResult.innerHTML = `ID: ${_result[0]}\tName: ${_result[1]}`;
                self.$tsxHash.innerHTML = `TSX: ${_result.transactionHash}`;
                self.$getName.innerHTML = '';
            }).catch(function(_err: any) {
                self.$createResult.innerHTML = `[Error]: ${_err.message}`;
            });
        });
    }

    private editBtn(): void {
        let self = this;
        this.$editBtn.addEventListener('click', function(_event: Event) {
            _event.preventDefault();
            let id: string = self.$getId.value;
            let name: string = self.$getName.value;
            self.crud.methods.update(id, name).send({from: self.accounts[0]}).then(function(_result: any) {
                self.$readResult.innerHTML = `Changed user ${id}`;
                self.$tsxHash.innerHTML = `TSX: ${_result.transactionHash}`;
                self.$getName.innerHTML = '';
            }).catch(function(_err: any) {
                self.$createResult.innerHTML = `[Error]: ${_err.message}`;
            });
        });
    }

    private deleteBtn(): void {
        let self = this;
        this.$deleteBtn.addEventListener('click', function(_event: Event) {
            let id: string = self.$getId.value;
            self.crud.methods.destroy(id).send({from: self.accounts[0]}).then(function(_result: any) {
               self.$readResult.innerHTML = `Deleted user ${id}`;
               self.$tsxHash.innerHTML = `TSX: ${_result.transactionHash}`;
               self.$getName.innerHTML = '';
            }).catch(function(_err: any) {
                self.$createResult.innerHTML = `[Error]: ${_err.message}`;
            });
        });
    }

    public init(): void {
        this.createBtn();
        this.readBtn();
        this.editBtn();
        this.deleteBtn();
    }
}