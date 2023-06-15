(function(){"use strict";var e={556:function(e,t,i){var s=i(963),a=i(252);function n(e,t,i,s,n,o){const r=(0,a.up)("navbar-view"),u=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[((0,a.wg)(),(0,a.j4)(r,{key:e.$route.fullPath})),(0,a.Wm)(u)],64)}var o=i(577),r=i.p+"img/logo.49142e1b.png";const u={class:"navbar"},l={class:"navbar__head"},d={class:"navbar__logo"},c=(0,a._)("img",{alt:"logo",src:r},null,-1),h={class:"navbar__title-div"},z=(0,a.Uk)(" Quiz App "),p={class:"navbar__menu"};function _(e,t,i,s,n,r){const _=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",u,[(0,a._)("div",l,[(0,a._)("div",d,[(0,a.Wm)(_,{to:"/"},{default:(0,a.w5)((()=>[c])),_:1})]),(0,a._)("div",h,[(0,a.Wm)(_,{to:"/",class:"navbar__title"},{default:(0,a.w5)((()=>[z])),_:1})])]),(0,a._)("div",p,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.items,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"navbar__item",key:e.title},[(0,a.Wm)(_,{to:e.route,class:"navbar__link","active-class":"active-page"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.zw)(e.title),1)])),_:2},1032,["to"])])))),128))])])}var v={name:"NavbarView",data(){switch(localStorage.getItem("role")){case"admin":return{items:[{title:"Home",route:"/"},{title:"Quizzes",route:"/quizzes"},{title:"Logout",route:"/logout"}]};case"teacher":return{items:[{title:"Home",route:"/"},{title:"Quizzes",route:"/quizzes"},{title:"Students",route:"/students"},{title:"Logout",route:"/logout"}]};case"student":return{items:[{title:"Home",route:"/"},{title:"My Quizzes",route:"/my-quizzes"},{title:"Quizzes",route:"/quizzes"},{title:"Logout",route:"/logout"}]};default:return{items:[{title:"Home",route:"/"},{title:"Login",route:"/login"}]}}}},q=i(744);const g=(0,q.Z)(v,[["render",_]]);var m=g,w={name:"App",components:{NavbarView:m},beforeMount(){localStorage.getItem("authToken")||this.$router.push("/login")}};const k=(0,q.Z)(w,[["render",n]]);var b=k,y=i(119);const Q={class:"home"},f=(0,a._)("div",{class:"home__title"},[(0,a._)("h1",null,"Welcome to Quiz App")],-1),$=(0,a._)("div",{class:"home__text"},[(0,a._)("p",null,[(0,a.Uk)(" This is a simple quiz app that allows you to create and take quizzes. "),(0,a._)("br"),(0,a.Uk)(" With student, teacher and admin roles. "),(0,a._)("br"),(0,a.Uk)(" You can navigate through the app by clicking on the links above. ")])],-1),T=[f,$];function D(e,t,i,s,n,o){return(0,a.wg)(),(0,a.iD)("div",Q,T)}var A={name:"HomeView"};const S=(0,q.Z)(A,[["render",D]]);var C=S;const I={class:"login__page"},V=(0,a._)("h2",{class:"login-title"},"Log In",-1),E={class:"login-form"},H={class:"login__field"},O={class:"login__field"},U=(0,a._)("div",{class:"login__submit"},[(0,a._)("button",{action:"submit",class:"btn"},"Login")],-1);function Y(e,t,i,n,o,r){return(0,a.wg)(),(0,a.iD)("div",I,[V,(0,a._)("div",E,[(0,a._)("form",{onSubmit:t[2]||(t[2]=(0,s.iM)(((...e)=>r.handleSubmit&&r.handleSubmit(...e)),["prevent"])),class:"login"},[(0,a._)("div",H,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>o.username=e),class:"login__input",type:"text",placeholder:"Username"},null,512),[[s.nr,o.username]])]),(0,a._)("div",O,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>o.password=e),class:"login__input",type:"password",placeholder:"Password"},null,512),[[s.nr,o.password]])]),U],32)])])}var B=i(669),M=i.n(B),K={name:"LoginView",beforeMount(){this.$cookies.isKey("authToken")&&this.$router.push("/")},data(){return{username:"",password:""}},methods:{handleSubmit(){M().post("https://quiz-app-web-seven.vercel.app/api/v0.0.1/user/login",{username:this.username,password:this.password}).then((({data:e})=>{this.$cookies.set("authToken",e.data.token),localStorage.setItem("role",e.data.user.role),this.$router.push("/")})).catch((e=>{alert(e.response.data.message||"Internal Server Error")}))}}};const Z=(0,q.Z)(K,[["render",Y]]);var P=Z;const L={class:"my-quizzes"},j={class:"my-quiz-card__header"},x=["onClick"],F={class:"my-quiz-card__content"},N=(0,a.Uk)("Score: "),W={key:0,class:"my-quiz-card__content"},R=["onClick"];function G(e,t,i,s,n,r){return(0,a.wg)(),(0,a.iD)("div",L,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.quizzes,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"my-quiz-card",key:e._id},[(0,a._)("div",j,[(0,a._)("h3",{onClick:t=>r.goToQuiz(e)},(0,o.zw)(e.quiz.title),9,x)]),(0,a._)("div",F,[(0,a._)("p",null,[N,(0,a._)("span",{class:(0,o.C_)(r.getScoreClass(e.score))},(0,o.zw)(e.score>-1?e.score:"Not evaluated"),3)]),(0,a._)("p",{class:(0,o.C_)(e.isComplete?"complete":"incomplete")},(0,o.zw)(e.isComplete?"Complete":"Incomplete"),3)]),e.isComplete?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",W,[(0,a._)("button",{class:"btn",onClick:t=>r.goToQuiz(e)},"Continue Quiz",8,R)]))])))),128))])}var J={name:"MyquizzesView",data(){return{quizzes:[]}},beforeMount(){localStorage.getItem(!0)&&this.$router.push("/"),this.getQuizzes()},methods:{getQuizzes(){M().get("https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/my",{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((e=>{this.quizzes=e.data.data.solvedQuizzes})).catch((e=>{alert(e.response.data.message||"Internal Server Error")}))},getScoreClass(e){return e<0?"unknown":e<50?"fail":e<75?"pass":"good"},goToQuiz(e){return this.$router.push("/my-quizzes/"+e._id)}}};const X=(0,q.Z)(J,[["render",G]]);var ee=X;function te(e,t,i,s,n,o){const r=(0,a.up)("QuizzesStudent"),u=(0,a.up)("QuizzesOther");return"student"===n.role?((0,a.wg)(),(0,a.j4)(r,{key:0,goToQuiz:o.goToQuizStudent,quizzes:n.quizzes},null,8,["goToQuiz","quizzes"])):((0,a.wg)(),(0,a.j4)(u,{key:1,goToQuiz:o.goToQuizOther,quizzes:n.quizzes},null,8,["goToQuiz","quizzes"]))}const ie={class:"quizzes"},se={class:"quiz-card__header"},ae={class:"quiz-card__content"},ne={class:"quiz-card__content"},oe=["onClick"],re={key:0},ue={key:1},le={key:2};function de(e,t,i,s,n,r){return(0,a.wg)(),(0,a.iD)("div",ie,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.quizzes,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"quiz-card",key:e._id},[(0,a._)("div",se,[(0,a._)("h3",null,(0,o.zw)(e.title),1)]),(0,a._)("div",ae,[(0,a._)("p",null,"Questions: "+(0,o.zw)(e.questionNum),1)]),(0,a._)("div",ne,[(0,a._)("button",{class:"btn",onClick:t=>i.goToQuiz(e)},["none"===e.status?((0,a.wg)(),(0,a.iD)("span",re,"Start Quiz")):"incomplete"===e.status?((0,a.wg)(),(0,a.iD)("span",ue,"Continue Quiz")):"complete"===e.status?((0,a.wg)(),(0,a.iD)("span",le,"View Results")):(0,a.kq)("",!0)],8,oe)])])))),128))])}var ce={props:{quizzes:{type:Object,required:!0},goToQuiz:{type:Function,required:!0}}};const he=(0,q.Z)(ce,[["render",de]]);var ze=he;const pe={class:"quizzes"},_e={class:"quiz-card__header"},ve={class:"quiz-card__content"},qe={class:"quiz-card__content"},ge=["onClick"],me={key:0},we={key:1};function ke(e,t,i,s,n,r){return(0,a.wg)(),(0,a.iD)("div",pe,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.quizzes,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"quiz-card",key:e._id},[(0,a._)("div",_e,[(0,a._)("h3",null,(0,o.zw)(e.title),1)]),(0,a._)("div",ve,[(0,a._)("p",null,"Questions: "+(0,o.zw)(e.questionNum),1)]),(0,a._)("div",qe,[(0,a._)("button",{class:"btn",onClick:t=>i.goToQuiz(e)},[e.isPublished?((0,a.wg)(),(0,a.iD)("span",me,"Preview Quiz")):((0,a.wg)(),(0,a.iD)("span",we,"Edit Quiz"))],8,ge)])])))),128)),r.isAdmin()?((0,a.wg)(),(0,a.iD)("button",{key:0,class:"btn",onClick:t[0]||(t[0]=(...e)=>r.addQuiz&&r.addQuiz(...e))},"Add Quiz")):(0,a.kq)("",!0)])}var be={props:{quizzes:{type:Object,required:!0},goToQuiz:{type:Function,required:!0}},methods:{isAdmin(){return"admin"===localStorage.getItem("role")},addQuiz(){M().post("https://quiz-app-web-seven.vercel.app/api/v0.0.1/quiz/",{title:"Untitled Quiz",isPublished:!1},{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((e=>{this.goToQuiz(e.data.data.quiz)})).catch((e=>{alert(e.response.data.message||"Internal Server Error")}))}}};const ye=(0,q.Z)(be,[["render",ke]]);var Qe=ye,fe={name:"MyquizzesView",components:{QuizzesStudent:ze,QuizzesOther:Qe},data(){return{quizzes:[],role:""}},created(){this.role=localStorage.getItem("role"),this.getQuizzes()},methods:{getQuizzes(){M().get("https://quiz-app-web-seven.vercel.app/api/v0.0.1/quiz/",{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((e=>{this.quizzes=e.data.data.quizzes,"student"===this.role&&this.quizzes.forEach((async(e,t)=>{let i,s=!1,a=!1;try{i=(await M().get(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/my?quizId=${e._id}`,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}})).data.data.solvedQuizzes}catch(n){alert(n.response.data.message||"Internal Server Error")}i.length>0&&(s=i[0].isComplete,a=!0),this.quizzes[t].status=a&&s?"complete":a?"incomplete":"none"}))})).catch((e=>{alert(e.response.data.message||"Internal Server Error")}))},async goToQuizStudent(e){if("none"!==e.status){let t;try{t=(await M().get(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/my?quizId=${e._id}`,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}})).data.data.solvedQuizzes}catch(i){alert(i.response.data.message||"Internal Server Error")}if(t.length>0)return this.$router.push("/my-quizzes/"+t[0]._id)}let t;try{t=(await M().post("https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/",{quiz:e._id},{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}})).data.data.solvedQuiz._id}catch(i){alert(i.response.data.message||"Internal Server Error")}return this.$router.push("/my-quizzes/"+t)},async goToQuizOther(e){return this.$router.push("/quizzes/"+e._id)}}};const $e=(0,q.Z)(fe,[["render",te]]);var Te=$e;const De={class:"quiz"},Ae={class:"question__title"},Se={class:"question__answers"},Ce=["onClick"],Ie={class:"choice"},Ve={class:"answer"},Ee={key:0,class:"quiz__submit"},He={key:1,class:"quiz__score"};function Oe(e,t,i,s,n,r){return(0,a.wg)(),(0,a.iD)("div",De,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.questions,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{class:"question",key:e._id},[(0,a._)("div",Ae,[(0,a._)("h2",null,(0,o.zw)(t+1)+") "+(0,o.zw)(e.title),1)]),(0,a._)("div",Se,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.answers,((t,i)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,o.C_)(("complete"===this.quiz.status?t.correct?t.given?"correct":"correctOne":t.given?"incorrect":"empty":t.given?"given":"non-selected")+" question__answer"),key:t._id,onClick:i=>r.selectAnswer(e._id,t._id)},[(0,a._)("h3",Ie,(0,o.zw)(n.alphabet[i])+") ",1),(0,a._)("h3",Ve,(0,o.zw)(t.title),1)],10,Ce)))),128))])])))),128)),"complete"!==this.quiz.status?((0,a.wg)(),(0,a.iD)("div",Ee,[(0,a._)("button",{class:"btn",onClick:t[0]||(t[0]=e=>r.submitQuiz(!0))},"Submit Quiz")])):((0,a.wg)(),(0,a.iD)("div",He,[(0,a._)("h2",null,"Your score: "+(0,o.zw)(this.quiz.score)+"/100",1)]))])}var Ue={name:"MyquizView",data(){return{published:!1,quiz:{},questions:[],alphabet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]}},created(){this.getQuizAndQuestions()},methods:{getQuizAndQuestions(){M().get(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/my/${this.$route.params.id}`,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((e=>{this.quiz=e.data.data.solvedQuiz,!0===this.quiz.isComplete?this.quiz.status="complete":!1===this.quiz.isComplete&&(this.quiz.status="incomplete"),this.questions=e.data.data.solvedQuiz.answers.map((e=>({_id:e.question._id,title:e.question.title,answers:e.question.answers.map((t=>({_id:t._id,title:t.title,given:e.answer?._id===t._id,correct:"complete"===this.quiz.status?t.correct:void 0})))})))}))},selectAnswer(e,t){if("complete"===this.quiz.status)return;const i=this.questions.find((t=>t._id===e));i.answers.forEach((e=>{e._id===t?e.given=!0:e.given=!1}))},submitQuiz(e=!0){const t={quiz:this.quiz.quiz._id,isComplete:e,answers:this.questions.map((e=>{const t=e.answers.find((e=>!0===e.given))?._id;return t?{question:e._id,answer:t}:{question:e._id,answer:null}}))};M().patch(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/my/${this.quiz._id}`,t,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((()=>{this.published=!0,e&&this.$router.push("/my-quizzes")})).catch((e=>{alert(e.response.data.message||"Internal Server Error"),console.log(e)}))}},beforeRouteLeave(){this.published||"complete"===this.quiz.status||this.quiz.isPublished||this.submitQuiz(!1)}};const Ye=(0,q.Z)(Ue,[["render",Oe]]);var Be=Ye;const Me=(0,a._)("div",{class:"add-form__header"},[(0,a._)("h2",null,"Add a question")],-1),Ke={class:"add-form__question__title"},Ze={class:"add-form__question__answers"},Pe=["value"],Le=["onUpdate:modelValue","placeholder"],je={class:"add-form__question__submit"},xe={key:1,class:"add-form__publish-quiz"},Fe={class:"quiz__header"},Ne={key:1},We={class:"quiz__questions"},Re={class:"question__title"},Ge={class:"question__answers"},Je={class:"choice"},Xe={class:"answer"},et={key:0,class:"question__delete"},tt=["onClick"];function it(e,t,i,n,r,u){return(0,a.wg)(),(0,a.iD)(a.HY,null,[u.editable?((0,a.wg)(),(0,a.iD)("div",{class:"question__add-form",key:r.reloadForm},[Me,(0,a._)("div",Ke,[(0,a.wy)((0,a._)("input",{class:"add-form__question__input",type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>r.questionToAdd.title=e),placeholder:"Question"},null,512),[[s.nr,r.questionToAdd.title]])]),(0,a._)("div",Ze,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.questionToAdd.answers,((e,i)=>((0,a.wg)(),(0,a.iD)("div",{class:"add-form__question__answers__inputs",key:i},[(0,a.wy)((0,a._)("input",{class:"add-form__question__correct",type:"radio",value:i,"onUpdate:modelValue":t[1]||(t[1]=e=>r.questionToAdd.pickedAnswer=e)},null,8,Pe),[[s.G2,r.questionToAdd.pickedAnswer]]),(0,a.wy)((0,a._)("input",{class:"add-form__question__answer",type:"text","onUpdate:modelValue":t=>e.title=t,placeholder:r.alphabet[i]},null,8,Le),[[s.nr,e.title]])])))),128)),r.alphabet[r.questionToAdd.answerAmount]?((0,a.wg)(),(0,a.iD)("button",{key:0,onClick:t[2]||(t[2]=(...e)=>u.addChoice&&u.addChoice(...e)),class:"btn"},(0,o.zw)(`Add Choice (${r.alphabet[r.questionToAdd.answerAmount]})`),1)):(0,a.kq)("",!0)]),(0,a._)("div",je,[(0,a._)("button",{class:"btn",onClick:t[3]||(t[3]=(...e)=>u.addQuestion&&u.addQuestion(...e))},"Add Question")])])):(0,a.kq)("",!0),u.editable?((0,a.wg)(),(0,a.iD)("div",xe,[(0,a._)("button",{class:"btn",onClick:t[4]||(t[4]=(...e)=>u.publishQuiz&&u.publishQuiz(...e))},"Publish Quiz"),(0,a._)("button",{class:"btn",onClick:t[5]||(t[5]=(...e)=>u.deleteQuiz&&u.deleteQuiz(...e))},"Delete Quiz")])):(0,a.kq)("",!0),((0,a.wg)(),(0,a.iD)("div",{class:"quiz__container",key:r.reloadMain},[(0,a._)("div",Fe,[u.editable?(0,a.wy)(((0,a.wg)(),(0,a.iD)("input",{key:0,class:"quiz__header-input",type:"text","onUpdate:modelValue":t[6]||(t[6]=e=>r.quiz.title=e),placeholder:"Quiz Title"},null,512)),[[s.nr,r.quiz.title]]):((0,a.wg)(),(0,a.iD)("h2",Ne,(0,o.zw)(r.quiz.title),1))]),(0,a._)("div",We,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.quiz.questions,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{class:"question",key:e._id},[(0,a._)("div",Re,[(0,a._)("h2",null,(0,o.zw)(t+1)+") "+(0,o.zw)(e.title),1)]),(0,a._)("div",Ge,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.answers,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,o.C_)(`${e.correct&&"correct"} question__answer`),key:e._id},[(0,a._)("h3",Je,(0,o.zw)(r.alphabet[t])+") ",1),(0,a._)("h3",Xe,(0,o.zw)(e.title),1)],2)))),128))]),u.editable?((0,a.wg)(),(0,a.iD)("div",et,[(0,a._)("button",{class:"btn",onClick:t=>u.deleteQuestion(e._id)},"Delete",8,tt)])):(0,a.kq)("",!0)])))),128))])]))],64)}var st={name:"QuizView",beforeMount(){"student"===localStorage.getItem("role")&&this.$router.push("/")},created(){this.getQuiz()},data(){return{deleted:!1,quiz:{},reloadMain:1,reloadForm:-1,questionToAdd:{pickedAnswer:0,title:"",answerAmount:4,answers:[{title:"",correct:!1},{title:"",correct:!1},{title:"",correct:!1},{title:"",correct:!1}]},alphabet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",!1]}},computed:{editable(){return!this.quiz.isPublished&&"admin"===localStorage.getItem("role")}},methods:{async getQuiz(){try{this.quiz=(await M().get(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/quiz/${this.$route.params.id}`,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}})).data.data.quiz}catch(e){this.$router.push("/"),alert(e.response.data.message||"Internal Server Error")}},async addQuestion(){const e={title:this.questionToAdd.title,answers:this.questionToAdd.answers.map(((e,t)=>({title:e.title,correct:t===this.questionToAdd.pickedAnswer})))};this.quiz.questions.push(e),await this.updateQuiz(),this.reloadMain++,this.questionToAdd={pickedAnswer:0,title:"",answerAmount:4,answers:[{title:"",correct:!1},{title:"",correct:!1},{title:"",correct:!1},{title:"",correct:!1}]},this.reloadForm--},async deleteQuestion(e){this.quiz.questions=this.quiz.questions.filter((t=>t._id!==e)),await this.updateQuiz()},async addChoice(){this.questionToAdd.answers.push({title:"",correct:"false"}),this.questionToAdd.answerAmount++,this.reloadForm--},async updateQuiz(e=!1){const t={title:this.quiz.title,isPublished:e,questions:this.quiz.questions.map((e=>({title:e.title,answers:e.answers})))};try{this.quiz=(await M().patch(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/quiz/${this.$route.params.id}`,t,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}})).data.data.quiz}catch(i){alert(i.response.data.message||"Internal Server Error")}},async publishQuiz(){"Untitled Quiz"!==this.quiz.title?(await this.updateQuiz(!0),this.reloadMain++,this.reloadForm--):alert("Please give your quiz a title")},async deleteQuiz(){if(confirm("Are you sure you want to delete this quiz?")){this.deleted=!0;try{await M()["delete"](`https://quiz-app-web-seven.vercel.app/api/v0.0.1/quiz/${this.$route.params.id}`,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}),this.$router.push("/")}catch(e){alert(e.response.data.message||"Internal Server Error")}}}},async beforeRouteLeave(){if(!this.deleted)return"Untitled Quiz"===this.quiz.title?(alert("Please give your quiz a title"),!1):void await this.updateQuiz()}};const at=(0,q.Z)(st,[["render",it]]);var nt=at;const ot={class:"logout-text"};function rt(e,t,i,s,n,o){return(0,a.wg)(),(0,a.iD)("h3",ot,"Logging Out...")}var ut={name:"LogoutView",beforeMount(){M().post("https://quiz-app-web-seven.vercel.app/api/v0.0.1/user/logout",{},{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((()=>{this.$cookies.remove("authToken"),localStorage.removeItem("role"),this.$router.push("/")})).catch((e=>{alert(e.response.data.message||"Internal Server Error")}))}};const lt=(0,q.Z)(ut,[["render",rt]]);var dt=lt;const ct={class:"students"},ht={class:"student-card__header"},zt={class:"student-card__content"},pt={class:"student-card__content"},_t=["onClick"];function vt(e,t,i,s,n,r){return(0,a.wg)(),(0,a.iD)("div",ct,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.students,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"student-card",key:e._id},[(0,a._)("div",ht,[(0,a._)("h3",null,(0,o.zw)(e.name),1)]),(0,a._)("div",zt,[(0,a._)("p",null,"Solved Quizzes: "+(0,o.zw)(e.solvedQuizzes),1)]),(0,a._)("div",pt,[(0,a._)("button",{class:"btn",onClick:t=>r.goToStudent(e._id)}," View Student ",8,_t)])])))),128))])}var qt={name:"StudentsView",data(){return{students:[]}},async created(){await this.getStudents()},methods:{async getStudents(){M().get("https://quiz-app-web-seven.vercel.app/api/v0.0.1/user/student/",{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((e=>{this.students=e.data.data.users})).catch((e=>{alert(e.response.data.message||"Internal Server Error")}))},goToStudent(e){this.$router.push("/students/"+e)}}};const gt=(0,q.Z)(qt,[["render",vt]]);var mt=gt;const wt={class:"student"},kt={class:"student__header"},bt={class:"student-quiz-card__header"},yt=["onClick"],Qt={class:"student-quiz-card__content"},ft=(0,a.Uk)("Score: "),$t={class:"student-quiz-card__content"},Tt=["onClick"];function Dt(e,t,i,s,n,r){return(0,a.wg)(),(0,a.iD)("div",wt,[(0,a._)("div",kt,[(0,a._)("h1",null,(0,o.zw)(n.student.name+"'s Quizzes"),1)]),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.quizzes,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"student-quiz-card",key:e._id},[(0,a._)("div",bt,[(0,a._)("h3",{onClick:t=>r.goToQuiz(e._id)},(0,o.zw)(e.quiz.title),9,yt)]),(0,a._)("div",Qt,[(0,a._)("p",null,[ft,(0,a._)("span",{class:(0,o.C_)(r.getScoreClass(e.score))},(0,o.zw)(e.score>-1?e.score:"Not evaluated"),3)])]),(0,a._)("div",$t,[(0,a._)("button",{class:"btn",onClick:t=>r.goToQuiz(e._id)},"View Results",8,Tt)])])))),128))])}var At={name:"StudentView",data(){return{student:{},quizzes:[]}},created(){this.getStudent(),this.getQuizzes()},methods:{getStudent(){M().get("https://quiz-app-web-seven.vercel.app/api/v0.0.1/user/student/"+this.$route.params.id,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((e=>{this.student=e.data.data.user})).catch((e=>{alert(e.response.data.message||"Internal Server Error")}))},getQuizzes(){M().get(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/?userId=${this.$route.params.id}`,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}}).then((e=>{this.quizzes=e.data.data.solvedQuizzes})).catch((e=>{alert(e.response.data.message||"Internal Server Error")}))},goToQuiz(e){this.$router.push(`/students/${this.$route.params.id}/quiz/${e}`)},getScoreClass(e){return e<0?"unknown":e<50?"fail":e<75?"pass":"good"}}};const St=(0,q.Z)(At,[["render",Dt]]);var Ct=St;const It={class:"quiz"},Vt={class:"quiz__header"},Et={class:"question__title"},Ht={class:"question__answers"},Ot={class:"choice"},Ut={class:"answer"},Yt={class:"quiz__score"};function Bt(e,t,i,s,n,r){return(0,a.wg)(),(0,a.iD)("div",It,[(0,a._)("div",Vt,[(0,a._)("h2",null,(0,o.zw)(n.quiz.quiz.title),1)]),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.quiz.answers,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{class:"question",key:e._id},[(0,a._)("div",Et,[(0,a._)("h2",null,(0,o.zw)(t+1)+") "+(0,o.zw)(e.question.title),1)]),(0,a._)("div",Ht,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.question.answers,((t,i)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,o.C_)((t.correct?"correct":t._id===e.answer._id?"incorrect":"empty")+" question__answer"),key:t._id},[(0,a._)("h3",Ot,(0,o.zw)(n.alphabet[i])+") ",1),(0,a._)("h3",Ut,(0,o.zw)(t.title),1)],2)))),128))])])))),128)),(0,a._)("div",Yt,[(0,a._)("h2",null,(0,o.zw)(n.quiz.user.name)+"'s score: "+(0,o.zw)(this.quiz.score)+"/100",1)])])}var Mt={name:"StudentquizView",data(){return{quiz:{},questions:[],alphabet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]}},async created(){await this.getQuiz()},methods:{async getQuiz(){try{this.quiz=(await M().get(`https://quiz-app-web-seven.vercel.app/api/v0.0.1/solved-quiz/${this.$route.params.quizId}`,{headers:{Authorization:`Bearer ${this.$cookies.get("authToken")}`}})).data.data.solvedQuiz}catch(e){alert(e.response.data.message||"Internal Server Error")}}}};const Kt=(0,q.Z)(Mt,[["render",Bt]]);var Zt=Kt;const Pt=[{path:"/",name:"home",component:C},{path:"/login",name:"login",component:P},{path:"/my-quizzes",name:"my-quizzes",component:ee},{path:"/quizzes",name:"quizzes",component:Te},{path:"/my-quizzes/:id",name:"my-quiz",component:Be},{path:"/quizzes/:id",name:"quiz",component:nt},{path:"/logout",name:"logout",component:dt},{path:"/students",name:"students",component:mt},{path:"/students/:id",name:"student",component:Ct},{path:"/students/:id/quiz/:quizId",name:"student-quiz",component:Zt}],Lt=(0,y.p7)({history:(0,y.r5)(),routes:Pt});var jt=Lt,xt=i(123),Ft=i.n(xt);(0,s.ri)(b).use(Ft(),{expires:"90d"}).use(jt).mount("#app")}},t={};function i(s){var a=t[s];if(void 0!==a)return a.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,i),n.exports}i.m=e,function(){var e=[];i.O=function(t,s,a,n){if(!s){var o=1/0;for(d=0;d<e.length;d++){s=e[d][0],a=e[d][1],n=e[d][2];for(var r=!0,u=0;u<s.length;u++)(!1&n||o>=n)&&Object.keys(i.O).every((function(e){return i.O[e](s[u])}))?s.splice(u--,1):(r=!1,n<o&&(o=n));if(r){e.splice(d--,1);var l=a();void 0!==l&&(t=l)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[s,a,n]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.p="quiz-app-web/"}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,s){var a,n,o=s[0],r=s[1],u=s[2],l=0;if(o.some((function(t){return 0!==e[t]}))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(u)var d=u(i)}for(t&&t(s);l<o.length;l++)n=o[l],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(d)},s=self["webpackChunkclient"]=self["webpackChunkclient"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(556)}));s=i.O(s)})();
//# sourceMappingURL=app.1a4078b3.js.map