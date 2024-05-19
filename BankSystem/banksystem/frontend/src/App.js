import './css/App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import CreateBank from "./views/CreateBank";
import AdminDashboard from "./views/AdminDashboard";
import UserDashboard from "./views/UserDashboard";
import WithdrawMoney from "./views/WithdrawMoney";
import DepositMoney from "./views/DepositMoney";
import Transaction from "./views/Transaction";
import MyBanks from "./views/MyBanks";
import BankDashboard from "./views/BankDashboard";
import DepositMoneyDashboard from "./views/DepositMoneyDashboard";
import DepositMoneyToSomeone from "./views/DepositMoneyToSomeone";
import AllBankAccounts from "./views/AllBankAccounts";

function Main() {

  return (
      <>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/adminDashboard/createBank" element={<CreateBank />}/>
          <Route path="/adminDashboard/allBankAccounts" element={<AllBankAccounts />}/>
          <Route path="/adminDashboard" element={<AdminDashboard />}/>
          <Route path="/userDashboard" element={<UserDashboard />}/>
          <Route path="/userDashboard/myBanks" element={<MyBanks />}/>
          <Route path="/userDashboard/bank/:id" element={<BankDashboard />}/>
          <Route path="/userDashboard/bank/withdraw/:id" element={<WithdrawMoney />}/>
          <Route path="/userDashboard/bank/depositDashboard/:id" element={<DepositMoneyDashboard />}/>
          <Route path="/userDashboard/bank/deposit/:id" element={<DepositMoney />}/>
          <Route path="/userDashboard/bank/depositToSomeone/:id" element={<DepositMoneyToSomeone />}/>
          <Route path="/userDashboard/bank/transactions/:id" element={<Transaction />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </>
  );
}

function App() {
  return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
  );
}

export default App;
