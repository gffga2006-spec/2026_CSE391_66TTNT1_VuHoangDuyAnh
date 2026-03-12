/* Lay cac du lieu tu input */

const form = document.getElementById('main-form')
const fullname = document.getElementById('fullname')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')
const terms = document.getElementById('terms')

/* ham hien thi loi */

function showError(inputID, message){

const errorSpan = document.getElementById(`${inputID}-error`)

errorSpan.textContent = message

const input = document.getElementById(inputID)

if(input){
input.classList.add("error-border")
}

}

/* ham xoa loi */

function clearError(inputID){

const errorSpan = document.getElementById(`${inputID}-error`)

errorSpan.textContent = ""

const input = document.getElementById(inputID)

if(input){
input.classList.remove("error-border")
input.classList.add("success-border")
}

}

/* kiem tra ho ten */

function validateFullname(){

const value = fullname.value.trim()

const regex = /^[A-Za-zÀ-ỹ\s]+$/

if(value === ""){
showError("fullname","Không được để trống")
return false
}

if(value.length < 3){
showError("fullname","Ít nhất 3 ký tự")
return false
}

if(!regex.test(value)){
showError("fullname","Chỉ chứa chữ cái")
return false
}

clearError("fullname")

return true

}

/* kiem tra email */

function validateEmail(){

const value = email.value.trim()

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(value === ""){
showError("email","Không được để trống")
return false
}

if(!regex.test(value)){
showError("email","Email không đúng định dạng")
return false
}

clearError("email")

return true

}

/* kt sdt */

function validatePhone(){

const value = phone.value.trim()

const regex = /^0\d{9}$/

if(value === ""){
showError("phone","Không được để trống")
return false
}

if(!regex.test(value)){
showError("phone","SĐT phải 10 số")
return false
}

clearError("phone")

return true

}

/* kt mat khau */

function validatePassword(){

const value = password.value

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(value === ""){
showError("password","Không được để trống")
return false
}

if(!regex.test(value)){
showError("password","≥8 ký tự, có chữ hoa, chữ thường và số")
return false
}

clearError("password")

return true

}

/* kt xac nhan mk */

function validateConfirm(){

if(confirmPassword.value !== password.value){

showError("confirm-password","Mật khẩu không khớp")

return false

}

clearError("confirm-password")

return true

}

/* kt gioi tinh */

function validateGender(){

const gender = document.querySelector("input[name='gender']:checked")

if(!gender){

document.getElementById("gender-error").textContent = "Phải chọn giới tính"

return false

}

document.getElementById("gender-error").textContent = ""

return true

}

/* kt dieu khoan */

function validateTerms(){

if(!terms.checked){

document.getElementById("terms-error").textContent = "Phải đồng ý điều khoản"

return false

}

document.getElementById("terms-error").textContent = ""

return true

}

/* xu ly submit */

form.addEventListener("submit",function(e){

e.preventDefault()

const valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

document.getElementById("success").style.display="block"

document.getElementById("success").innerHTML =
"Đăng ký thành công 🎉<br>Xin chào "+fullname.value

}

})

/* validate khi blur */

fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirm)

/* xoa loi khi nhap lai */

document.querySelectorAll("input").forEach(input=>{

input.addEventListener("input",function(){

const id = input.id

const error = document.getElementById(id+"-error")

if(error){
error.textContent=""
}

input.classList.remove("error-border")

})

})