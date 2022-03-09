const fs=require("fs")
const user=require("readline-sync")
const axios=require("axios")
meraki_data=axios.get("https://api.merakilearn.org/courses")
// console.log(meraki_data)
.then(api=>{
    meraki_data=api.data
    // console.log(meraki_data)
    file=JSON.stringify(meraki_data,null,3)
    a=fs.writeFileSync("data.json",file)
    serial_no=1
    for (i of meraki_data){
        console.log(serial_no+1,".",i["name"],":",i["id"])
    serial_no+=1
    }
    let course_no=user.questionInt("enter ur number do u want:")
    console.log(meraki_data[course_no-1]["name"])
    let idd=meraki_data[course_no-1]["id"]
    axios.get("http://api.merakilearn.org/courses/"+idd+"/exercises")
    .then(api=>{
        meraki_data1=api.data
        // console.log(meraki_data)
        file1=JSON.stringify(meraki_data1,null,3)
        a2=fs.writeFileSync("topic.json",file1)
        parent_data=meraki_data1["course"]["exercises"]
        serial_no2=0
        for (i in parent_data){
            console.log(serial_no2+1,parent_data[i]["name"])
            serial_no2+=1
        }
        question=user.questionInt("enter the exercise no:")
        var slug=parent_data[question]["content"]
        console.log(slug)

    })
    .catch(error=>{
        console.log(error)
    })
})
.catch(Error=>{
    console.log(Error)
})



	

