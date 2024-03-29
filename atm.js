#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let currentBalance = 150000;
let pin = 1271;
//front message of atm.
console.log(chalk.blueBright("welcome to ATM"));
console.log(chalk.greenBright("please enter your card"));
//check the pin  password correct or not.
let user = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: "please enter your 4-digit pin code ",
});
if (pin === user.pin) {
    console.log(chalk.greenBright("Welcome"));
    let correctPin = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellowBright("please select operation "),
            choices: [
                "Account information",
                "Deposit",
                "Balance",
                "Withdraw",
                "Fast cash",
            ]
        }
    ]);
    if (correctPin.operation === "Account information") {
        function customerInformation() {
            let personInfo = {
                customerName: "Muhammad Usama",
                CNIC: "41302-378338475-9",
                card_type: "Debit card",
                accountInfo: "938583784_829"
            };
            return personInfo;
        }
        console.log(customerInformation());
    }
    else if (correctPin.operation === "Deposit") {
        let depositAmount = await inquirer.prompt([
            {
                name: "deposit",
                type: "number",
                message: chalk.magentaBright("please enter your deposit amount")
            }
        ]);
        currentBalance += depositAmount.deposit;
        console.log(chalk.greenBright(`cash deposit, your balance is ${currentBalance}`));
    }
    else if (correctPin.operation === "Balance") {
        console.log(chalk.magentaBright(`your current balance is ${currentBalance}`));
    }
    else if (correctPin.operation === "Withdraw") {
        let withdraw = await inquirer.prompt([
            {
                name: "withdraw_amount",
                type: "number",
                message: chalk.yellow("enter your withdraw amount"),
            }
        ]);
        let Withdraw = withdraw.withdraw_amount;
        if (Withdraw <= currentBalance) {
            let remainingBalance = currentBalance - Withdraw;
            console.log(chalk.yellowBright(`your remaining balance is ${remainingBalance}`));
        }
        else {
            console.log(chalk.redBright("insufficient balance"));
        }
    }
    else if (correctPin.operation === "Fast cash") {
        let fastCash = await inquirer.prompt([
            {
                name: "cash",
                type: "list",
                message: "select amount",
                choices: [5000, 10000, 15000, 20000, 25000, 30000,]
            }
        ]);
        currentBalance -= fastCash.cash;
        console.log(chalk.grey(`your withdraw as fast cash is successfully ${fastCash.cash}`));
        console.log(chalk.yellowBright(`Now, your balance is ${currentBalance}`));
    }
}
else {
    console.log(chalk.redBright(" Pin is Incorrect"));
    console.log(chalk.bgRedBright("please enter your correct 4-Digit pin code"));
}
