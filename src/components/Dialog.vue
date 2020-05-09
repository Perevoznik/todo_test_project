<template>

    <div class="overlay">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <h3>Подтвердите действие</h3>
                </div>

                <div class="modal-body">
                    <p>{{description}}</p>
                </div>

                
                <button class="btn btn-blue" @click="$emit('confirm-ok')">Подтвердить</button>
                <button class="btn btn-red" @click="$emit('confirm-cancel')">Отмена</button>
                
            </div>
        </div>
    </div>
    

</template>

<script>

export default {

    props: ['description']
}

</script>

<style>

.overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  color: black;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}


</style>