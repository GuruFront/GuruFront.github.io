<template lang="pug">
  .container
    .row
      .col-12
        table.table.time
          tbody
            tr
              th(scope='col') Последнее обновление:
              th(scope='col')
                span {{lastTimeOfRequest}}
            tr
              th(scope='col' ) Сеть:
              th(scope='col')
                div.internet-status(v-bind:class="{ active: online }")
    .row
      .col-12
        h1.main-title.text-center Конвертер валют
        form
          .form-group
            label(for="input") Сумма
            input(
            type="text"
            placeholder="0.00"
            v-model:value="enterValue"
            )#input.form-control
          .row
            .col-sm-6
              .form-group
                label(for="cy") Валюта
                select.form-control#cy(v-model:value="selectedCy")
                  option(v-for="item,index in response" v-bind:value="index" v-show="item.ccy != 'BTC'") {{item.ccy}}
            .col-sm-6
              .form-group
                label(for="type") Я хочу
                select.form-control#type(v-model:value="type")
                  option(value="buy") Продать
                  option(value="sale") Купить
          .form-group
            label(for="result") Результат
            input(
            type="text"
            v-bind:value="lastResult"
            )#result.form-control
        p
          | Курсы валют ПриватБанка&#32;
          a(href='https://api.privatbank.ua/#p24/exchange').
            API предоставляет информацию о наличных, безналичных курсах валют ПриватБанка 2

</template>
<script>

export default {
  data () {
    return {
      url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
      response: [],
      enterValue: 0,
      result: 0,
      selectedCy: 0,
      type: 'buy',
      online: true
    }
  },
  methods:{
    addDateFormat(int) {
      int = int.toString();
      if (int.charAt(1)) {
        return int;
      } else {
        return '0' + int;
      }
    }
  },
  computed:{
    lastResult() {
      return this.result = this.enterValue * this.response[this.selectedCy][this.type] + ' UAH';
    },
    lastTimeOfRequest(){
        if (window.navigator.onLine){
          this.online = true;
          let newDate  = new Date(),
              now;

          now =
            this.addDateFormat(newDate.getHours()) + ':' +
            this.addDateFormat(newDate.getMinutes()) + ':' +
            this.addDateFormat(newDate.getSeconds()) + ' ' +
            newDate.toLocaleDateString();
           return localStorage.lastTimeOfRequest = now;
      } else {
          this.online = false;
        }
    }
  },
  created(){
    this.$http.get(this.url)
    .then(response => {
      this.response =response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }
}
</script>

<style lang="scss">
 .slide-fade-enter-active {
   transition: all .3s ease;
 }
 .slide-fade-leave-active {
   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
 }
 .slide-fade-enter, .slide-fade-leave-to
   /* .slide-fade-leave-active до версии 2.1.8 */ {
   transform: scale(1.1);
   filter: blur(10px);
   opacity: 0;
 }

 .main-title{
   text-align: center;
 }

 .update{
   margin-left: 10px;
 }

 .time{
   max-width: 400px;
 }

 .internet-status{
   width: 15px;
   height: 15px;
   background-color: red;
   border-radius: 100%;
   &.active{
     background-color: green;
   }
 }


</style>
