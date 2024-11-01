import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
export default function UsersDetails() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const GetUsers = async () => {
    try{
      const response = await fetch("https://real-estate-be-5852.onrender.com/api/admin/users", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setLoading(true);
      if (!response.ok) {
        setLoading(true);
      } else {
        setLoading(false);
        setUser(result.users);
      }
    }catch(err){
      setError(err.message)
    }
    
  };
  useEffect(() => {
    GetUsers();
  }, []);
  return (
    <>
      <h1>{loading ? <p>Lodaing...</p> : ""}</h1>
      <div className="grid grid-cols-2">
      {users.map((user) => (
        <div key={user._id} className="cards mx-auto mb-5 text-cente">
          <Card className="max-w-[400px] min-w-[200px] ">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">Name: {user.name}</p>
                
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
         
              <p>
              email id: {user.email}
              </p>
              <p>
                mobile: {user.mobile}
              </p>
            </CardBody>
          </Card>
        </div>
        ))}
      </div>
    </>
  );
}
