import axios from 'axios';
//import axios from '../components/axiosConfig';

export const register =  newStudent => {
    return axios
    .post('http://localhost:5000/api/students', {
        student_number: newStudent.student_number,
        password:newStudent.password,
        first_name:newStudent.first_name,
        last_name:newStudent.last_name,
        address:newStudent.address,
        city:newStudent.city,
        phone_number:newStudent.phone_number,
        email:newStudent.email,
        program:newStudent.program
    })
    .then(res => {
        console.log(res);
        if(res.data.error){
            return { error: res.data.error };
        } else {
            return { status: 'Registerd! in studentsFunctions' };
        }
    });

}
export const login =  student => {
    return axios
    .post('http://localhost:5000/signin', {
        auth:{
            email: student.email,
            password: student.password
    }})
    .then(res => {
        console.log('res after login ', res);
        let student = res.data.student;
        localStorage.setItem('studenttoken', res.data.token);
        localStorage.setItem('studentName', student.first_name);
        localStorage.setItem('email', student.email);
        localStorage.setItem('studentNumber', student.student_number);
        console.log("student name in local storage: " + localStorage.studentName);
        return res.data;
    })
    .catch(err => {
        console.log("Error " + err);
    });
}

export const logout =  student => {
    return axios
    .get('http://localhost:5000/signout', {withCredentials: true})
    .then(res => {
        console.log('logout success ' + res);        
        localStorage.removeItem('studenttoken');
        localStorage.removeItem('studentName');
        localStorage.removeItem('email');
        localStorage.removeItem('studentNumber');
        //console.log("Res " + res.data.student.student_number);
        return { status: 'logout success' };
    })
    .catch(err => {
        console.log("Error " + err);
    });
}
