import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
    const loggedIn = {firstName: 'Riadh', lastName: 'Laroui', email: 'larouiriadh@gmail.com'};


    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox 
                        type= "greeting"
                        title= "Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext = "Access and manage your accounts."
                    />

                    <TotalBalanceBox
                        accounts= {[]}
                        totalBanks={1}
                        totalCurrentBalance={1234.69}
                    />
                </header>
                Recent Transactions
            </div>
            <RightSidebar 
                user= {loggedIn}
                transactions={[]}
                banks={[{currentBalance: 123.11}, {currentBalance: 999.2}]}
            />
        </section>
    );
}

export default Home