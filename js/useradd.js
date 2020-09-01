$(function () {

    initDeptAndJob();
    async function initDeptAndJob() {
        let departmentData = await queryDepart();
        let jobData = await queryJob();
        // console.log(departmentData)
        // console.log(jobData)

        if (departmentData.code === 0) {
            departmentData = departmentData.data;
            let str = ``;
            departmentData.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`;
            })
            $(".userdepartment").html(str);
        }
        if (jobData.code === 0) {
            jobData = jobData.data;
            let str = ``;
            jobData.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`;
            })
            $(".userjob").html(str);
        }
    }

    function checkname() {
        let val = $(".username").val().trim();
        if (val.length === 0) {
            $(".spanusername").html("此为必填项~")
            return false;
        }
        if (!/^[\u4e00-\u9fa5]{2,10}$/.test(val)) {
            $(".spanusername").html("名字必须是2~10个汉字")
            return false;
        }
        $(".spanusername").html("姓名OK")
        return true;
    }
    function checkemail(){
        let val = $(".useremail").val().trim();
        if (val.length === 0) {
            $(".spanuseremail").html("此为必填项~")
            return false;
        }
        if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val)) {
            $(".spanuseremail").html("请填写正确的邮箱~")
            return false;
        }
        $(".spanuseremail").html("")
        return true;
    }
    function checkphone(){
        let val = $(".userphone").val().trim();
        if (val.length === 0) {
            $(".spanuserphone").html("此为必填项~")
            return false;
        }
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(val)) {
            $(".spanuserphone").html("请填写正确的手机号~")
            return false;
        }
        $(".spanuserphone").html("")
        return true;
    }

    $(".username").blur(checkname);
    $(".username").blur(checkemail);
    $(".username").blur(checkphone);

    $(".submit").click(async function(){
        if(!checkname() || !checkemail() || !checkphone()){
            alert("你填写的数据不合法");
            return;
        }
        
        let params = {
            name:$(".username").val().trim(),
            sex:$("#man").prop("checked") ? 0 : 1, // sex值要么是0  要么是1  0代表男   1代表女
            email:$(".useremail").val().trim(),
            phone:$(".userphone").val().trim(),
            departmentId:$(".userdepartment").val(),
            jobId:$(".userjob").val(),
            desc:$(".userdesc").val().trim()
        }
        // console.log(params)
        let result = await axios.post("/user/add",params)
        if(result.code === 0){
            alert("添加员工成功~");
            window.location.href = "userlist.html"
            return
        }
        alert("网络不给力，稍后再试~")
    })    





})