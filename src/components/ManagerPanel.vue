<template>
  <div class="container mt-5 manage" >
    <div class="row manage-top p-2">
      <div class="col-9">
        <h3 class="mb-4">Manager Panel</h3>
        <h5>Assign Quizzes and Manage Student Progress.</h5>

      </div>
      <div class="col-3">
        <img src="../assets/manag.gif" alt="">
      </div>
    </div>

    <div class="btn-group container mt-5 d-flex justify-content-center" role="group" aria-label="Manager actions">
      <div class="row ">
        <div class="col-12">
          <a class="card education" @click="showStudents">
            <div class="overlay"></div>
            <div class="circle">
              <svg width="71px" height="76px" viewBox="29 14 71 76" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs></defs>
                <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                  transform="translate(30.000000, 14.000000)">
                  <g id="Group-8" fill="#D98A19">
                    <g id="Group-7">
                      <g id="Group-6">
                        <path
                          d="M0,0 L0,75.9204805 L69.1511499,75.9204805 L0,0 Z M14.0563973,32.2825679 L42.9457663,63.9991501 L14.2315268,63.9991501 L14.0563973,32.2825679 Z"
                          id="Fill-1"></path>
                      </g>
                    </g>
                  </g>
                  <g id="Group-20" transform="translate(0.000000, 14.114286)" stroke="#FFFFFF" stroke-linecap="square">
                    <path d="M0.419998734,54.9642857 L4.70316223,54.9642857" id="Line"></path>
                    <path d="M0.419998734,50.4404762 L4.70316223,50.4404762" id="Line"></path>
                    <path d="M0.419998734,45.9166667 L4.70316223,45.9166667" id="Line"></path>
                    <path d="M0.419998734,41.3928571 L2.93999114,41.3928571" id="Line"></path>
                    <path d="M0.419998734,36.8690476 L4.70316223,36.8690476" id="Line"></path>
                    <path d="M0.419998734,32.3452381 L4.70316223,32.3452381" id="Line"></path>
                    <path d="M0.419998734,27.8214286 L4.70316223,27.8214286" id="Line"></path>
                    <path d="M0.419998734,23.297619 L2.93999114,23.297619" id="Line"></path>
                    <path d="M0.419998734,18.7738095 L4.70316223,18.7738095" id="Line"></path>
                    <path d="M0.419998734,14.25 L4.70316223,14.25" id="Line"></path>
                    <path d="M0.419998734,9.72619048 L4.70316223,9.72619048" id="Line"></path>
                    <path d="M0.419998734,5.20238095 L2.93999114,5.20238095" id="Line"></path>
                    <path d="M0.419998734,0.678571429 L4.70316223,0.678571429" id="Line"></path>
                  </g>
                </g>
              </svg>
            </div>
            <p>Manage Students</p>
          </a>
        </div>

      </div>
    </div>
    <StudentComponent v-if="activeTab === 'students'" @backToMain="activeTab = ''" />

  </div>
</template>

<script>
import StudentComponent from './StudentComponent.vue';

export default {
  data() {
    return {
      activeTab: ''
    };
  },
  components: {
    StudentComponent,
  },
  methods: {
    showStudents() {
      this.activeTab = 'students';
    },
  }
};

</script>

<style scoped>
/* .container {
  max-width: 800px;
  margin: auto;
} */

.education {
  --bg-color: #ffd861;
  --bg-color-light: #ffeeba;
  --text-color-hover: #4C5656;
  --box-shadow-color: rgba(255, 215, 97, 0.48);
}

.card {
  width: 389px;
  height: 262px;
  background: #fff;
  border-top-right-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-out;
  text-decoration: none;
}

.card:hover {
  transform: translateY(-5px) scale(1.005) translateZ(0);
  box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11),
    0 24px 46px var(--box-shadow-color);
}

.card:hover .overlay {
  transform: scale(4) translateZ(0);
}

.card:hover .circle {
  border-color: var(--bg-color-light);
  background: var(--bg-color);
}

.card:hover .circle:after {
  background: var(--bg-color-light);
}

.card:hover p {
  color: var(--text-color-hover);
}

.card:active {
  transform: scale(1) translateZ(0);
  box-shadow: 0 15px 24px rgba(0, 0, 0, 0.11),
    0 15px 24px var(--box-shadow-color);
}

.card p {
  font-size: 17px;
  color: #4C5656;
  margin-top: 30px;
  z-index: 1000;
  transition: color 0.3s ease-out;
}

.circle {
  width: 131px;
  height: 131px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease-out;
}

.circle:after {
  content: "";
  width: 118px;
  height: 118px;
  display: block;
  position: absolute;
  background: var(--bg-color);
  border-radius: 50%;
  top: 7px;
  left: 7px;
  transition: opacity 0.3s ease-out;
}

.circle svg {
  z-index: 10000;
  transform: translateZ(0);
}

.overlay {
  width: 118px;
  position: absolute;
  height: 118px;
  border-radius: 50%;
  background: var(--bg-color);
  top: 39px;
  left: 136px;
  z-index: 0;
  transition: transform 0.3s ease-out;
}
.manage img{
  width: 139px;
  
}
.manage-top{
  box-shadow: 0 .1875rem .5rem 0 rgba(34,48,62,.1);
  color: 646e78;
}

</style>
