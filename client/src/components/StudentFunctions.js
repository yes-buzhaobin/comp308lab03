import axios from 'axios';

export const register =  newStudent => {
    return axios
    .post('http://localhost:5000/students/register', {
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
    .post('http://localhost:5000/students/login', {
        email: student.email,
        password: student.password
    })
    .then(res => {
        //console.log('res.token', res.data.token);
        let name = res.data.student.first_name;
        localStorage.setItem('studenttoken', res.data.token);
        localStorage.setItem('studentName', name);
        localStorage.setItem('email', res.data.student.email);
        localStorage.setItem('studentNumber', res.data.student.student_number);
        //console.log("Res " + res.data.student.student_number);
        return res.data;
    })
    .catch(err => {
        console.log("Error " + err);
    });
}
