export default function decodeToken(){
    const token=localStorage.getItem("token");
    if(!token) return null;
    const payload=JSON.parse(atob(token.split('.')[1]));
    console.log(payload);
    return payload;
}