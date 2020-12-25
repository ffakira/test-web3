import Web3 from 'web3';
import { abi, networks } from '../build/contracts/Crud.json';
import CrudMethods from './CrudMethods';

declare let web3: any;
declare global {
	interface Window {
		ethereum: any,
		web3: any
	}
}

class Main {
	public initWeb3(): Promise<any> {
		return new Promise(function(_resolve, _reject) {
			if (typeof window.ethereum !== 'undefined') {
				window.ethereum.enable().then(() => {
					_resolve(new Web3(window.ethereum))
				}).catch(function(_err: any) {
					console.log(_err);
				});
			}

			if (typeof window.web3 !== 'undefined') {
				return _resolve(new Web3(window.web3.currentProvider));
			}
			_resolve(new Web3('http://localhost:9545'));
		});
	}

	public initContract() {
		let networkId = Object.keys(networks)[0] as keyof typeof networks;
		return new web3.eth.Contract(abi, networks[networkId].address);
	}
}

document.addEventListener('DOMContentLoaded', function() {
	let main: Main = new Main();
	main.initWeb3().then(function(_web3: any) {
		web3 = _web3;

		web3.eth.getAccounts().then(function(_accounts: Array<string>){
			new CrudMethods(_accounts, main.initContract()).init();
		});

	}).catch(function(error: any) {
		console.log(error.message)
	});
});