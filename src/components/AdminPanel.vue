<template>
  <div class="dashboard animate__fadeIn animate__animated">
    <!-- Main Dashboard -->
    <div v-if="!activeTab">
      <div class="container">
        <div class="row welcome">
          <div class="col-8">
            <h1>Welcome to the Admin Dashboard</h1>
          </div>
          <div class="col-4">
            <img src="../assets/man-with-laptop-light.png" alt="Admin Dashboard" />
          </div>
        </div>
      </div>
      <div class="button-container d-flex row">
        <h2>Manage</h2>
        <div class="col-6">
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
        <div class="col-6">
          <a class="card human-resources" @click="showManagers">
            <div class="overlay"></div>
            <div class="circle">
              <svg width="66px" height="77px" viewBox="1855 26 66 77" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                  transform="translate(1855.000000, 26.000000)">
                  <path
                    d="M4.28872448,42.7464904 C4.28872448,39.3309774 5.4159227,33.7621426 6.40576697,30.4912557 C10.5920767,32.1098991 14.3021264,35.1207513 18.69596,35.1207513 C30.993618,35.1207513 42.5761396,28.7162991 49.9992251,17.9014817 C56.8027248,23.8881252 60.8188351,33.0463165 60.8188351,42.7464904 C60.8188351,60.817447 47.6104607,76.6693426 32.5537798,76.6693426 C17.4970989,76.6693426 4.28872448,60.817447 4.28872448,42.7464904"
                    id="Fill-8" fill="#AFCEFF"></path>
                  <path
                    d="M64.3368879,31.1832696 L62.8424171,46.6027478 L60.6432609,46.7824348 L59.8340669,34.6791304 L47.6573402,25.3339478 C44.2906753,34.068487 34.3459503,40.2903304 24.4684093,40.2903304 C17.7559812,40.2903304 10.046244,37.4168 5.80469412,32.8004522 L5.80469412,34.6791304 L5.80469412,46.6027478 L4.28932167,46.6027478 L1.30187314,27.8802435 C1.30187314,20.9790957 3.52342407,15.5432 7.27229127,11.3578087 C13.132229,4.79558261 21.8124018,0.0492173913 30.5672235,0.342852174 C37.4603019,0.569286957 42.6678084,2.72991304 50.8299179,0.342852174 C51.4629405,1.44434783 51.8615656,3.00455652 51.5868577,5.22507826 C51.4629405,6.88316522 51.2106273,7.52302609 50.8299179,8.45067826 C58.685967,14.1977391 64.3368879,20.7073739 64.3368879,31.1832696"
                    id="Fill-10" fill="#3B6CB7"></path>
                  <path
                    d="M58.9405197,54.5582052 C62.0742801,54.8270052 65.3603242,52.60064 65.6350321,49.5386574 C65.772386,48.009127 65.2617876,46.5570226 64.3182257,45.4584487 C63.3761567,44.3613357 62.0205329,43.6162922 60.4529062,43.4818922 L58.9405197,54.5582052 Z"
                    id="Fill-13" fill="#568ADC"></path>
                  <path
                    d="M6.32350389,54.675367 C3.18227865,54.8492104 0.484467804,52.4957496 0.306803449,49.4264626 C0.217224782,47.8925496 0.775598471,46.4579757 1.75200594,45.3886191 C2.7284134,44.3192626 4.10792487,43.6165843 5.67853749,43.530393 L6.32350389,54.675367 Z"
                    id="Fill-15" fill="#568ADC"></path>
                </g>
              </svg>
            </div>
            <p>Managers</p>
          </a>
        </div>
      </div>
    </div>

    <StudentComponent v-if="activeTab === 'students'" @backToMain="activeTab = ''" />
    <ManagerComponent v-if="activeTab === 'managers'" @backToMain="activeTab = ''" />
 

  </div>
</template>
<script>
import StudentComponent from './StudentComponent.vue';
import ManagerComponent from './ManagerComponent.vue';

export default {
  data() {
    return {
      activeTab: ''
    };
  },
  components: {
    StudentComponent,
    ManagerComponent
  },
  methods: {
    showStudents() {
      this.activeTab = 'students';
    },

    showManagers() {
      this.activeTab = 'managers';
    },
  }
};

</script>
<style scoped>
body {
  background-color: antiquewhite !important
}

.welcome {
  margin-top: 34px;
  padding: 32px;
  box-shadow: 0 .1875rem .5rem 0 rgba(34, 48, 66, .1);
}

.welcome img {
  max-width: 164px;

}

.dashboard {
  padding: 20px;
}

.button-container {
  margin: 20px 0;
}

.filter-container {
  margin-bottom: 20px;
}

.card {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}

/* ------------------ */

.education {
  --bg-color: #ffd861;
  --bg-color-light: #ffeeba;
  --text-color-hover: #4C5656;
  --box-shadow-color: rgba(255, 215, 97, 0.48);
}

.human-resources {
  --bg-color: #DCE9FF;
  --bg-color-light: #f1f7ff;
  --text-color-hover: #4C5656;
  --box-shadow-color: rgba(220, 233, 255, 0.48);
}

.card {
  height: 222px;
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
  top: 12px;
  left: 235px;
  z-index: 0;
  transition: transform 0.3s ease-out;
}

.back img {
  width: 26px;
}

.pending {
  background-color: #fff2d6 !important;
  color: #ffab00 !important;
}

.accepted {
  background-color: #e8fadf !important;
  color: #71dd37 !important;
}

span {
  color: #646e78;
}

.head {
  background-color: #e7e7ff !important;
  color: #696cff !important;
  width: 389px;
  height: 64px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 23px;
}

.back {
  width: 40px;
  background-color: #d7f5fc !important;
  border: none;
}

.manager-btn {
  color: #fff;
  background-color: #696cff;
  border-color: #696cff;
  box-shadow: 0 .125rem .25rem 0 rgba(105, 108, 255, .4);
  margin-top: 7px;
  width: 109px;
}

.btn-wrapper {
  display: flex;
  gap: 10px;
}

select {
  border: none;
  justify-content: center;
  background: #5f61e6;
  color: white;
  height: 37px;
  width: 102px;
  border-radius: 10px;
  box-shadow: 0 .125rem .25rem 0 rgba(105, 108, 255, .4);
}

.rejected {
  background-color: #ffe0db !important;
  color: #ff3e1d !important;
}

.quiz-assignment select {
  width: 241px;
}

.quiz-wrapper {
  margin-top: 15px;
}

.assign-btn {
  color: #fff;
  background-color: #ff3e1d;
  border-color: #ff3e1d;
  box-shadow: 0 1px 20px 1px #ff3e1d;
  width: 117px;
  border-radius: 8px;
}
</style>