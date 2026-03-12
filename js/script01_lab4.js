let students = []

let sortAsc = true

function addStudent(){

    let name = document.getElementById("name").value
    let score = document.getElementById("score").value

    if(name.trim() == ""){
        alert("Vui lòng nhập họ tên")
        return
    }

    if(score == "" || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10")
        return
    }

    let student = {
        name: name,
        score: parseFloat(score)
    }

    students.push(student)

    document.getElementById("name").value = ""
    document.getElementById("score").value = ""

    document.getElementById("name").focus()

    applyFilters()
}

function rank(score){

    if(score >= 8.5) return "Giỏi"
    if(score >= 7 && score < 8.5) return "Khá"
    if(score >= 5 && score < 7) return "Trung bình"
    return "Yếu"

}

function renderTable(list){

    let tbody = document.getElementById("tableBody")

    let html = ""

    for(let index = 0; index < list.length; index++){

        let color = ""

        if(list[index].score < 5){
            color = "class='low'"
        }

        html += "<tr "+color+">"
        html += "<td>" + (index+1) + "</td>"
        html += "<td>" + list[index].name + "</td>"
        html += "<td>" + list[index].score + "</td>"
        html += "<td>" + rank(list[index].score) + "</td>"
        html += "<td>"
        html += "<button onclick='deleteRow("+students.indexOf(list[index])+")'>Xóa</button>"
        html += "</td>"
        html += "</tr>"
    }

    if(list.length == 0){
        html = "<tr><td colspan='5'>Không có kết quả</td></tr>"
    }

    tbody.innerHTML = html

    updateStats()
}

function deleteRow(index){

    students.splice(index,1)

    applyFilters()

}

function updateStats(){

    let total = students.length

    let sum = 0

    for(let i = 0; i < students.length; i++){
        sum += students[i].score
    }

    let avg = 0

    if(total > 0){
        avg = (sum / total).toFixed(2)
    }

    document.getElementById("stats").innerHTML =
    "Tổng sinh viên: " + total + " | Điểm trung bình: " + avg

}

function applyFilters(){

    let keyword = document.getElementById("search").value.toLowerCase()

    let filter = document.getElementById("filter").value

    let result = []

    for(let i = 0; i < students.length; i++){

        let name = students[i].name.toLowerCase()

        let r = rank(students[i].score)

        if(name.includes(keyword)){

            if(filter == "all" || r == filter){

                result.push(students[i])

            }

        }

    }

    result.sort(function(a,b){

        if(sortAsc){
            return a.score - b.score
        }else{
            return b.score - a.score
        }

    })

    renderTable(result)

}

document.getElementById("search").addEventListener("input", applyFilters)

document.getElementById("filter").addEventListener("change", applyFilters)

document.getElementById("sortScore").addEventListener("click", function(){

    sortAsc = !sortAsc

    applyFilters()

})

document.getElementById("score").addEventListener("keypress", function(e){

    if(e.key == "Enter"){
        addStudent()
    }

})