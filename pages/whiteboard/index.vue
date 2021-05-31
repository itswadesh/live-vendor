<template>
  <div class="px-4 py-8 bg-white">
    <div class="col-sm">
          <button id="previousPage"  >prev page</button>
          <button id="nextPage"  >next page</button>
    </div>
    <div class="row" style="margin-top: 1%;">
        <div class="col-sm">
          <h6 class="pb-2 mb-0">
            Whiteboard containers (1000 x 600)
          </h6>
          <div id="mywhiteboard" style="width: 1000px; height: 600px; border: 1px dashed #ddd;position: relative;">
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import {ZegoExpressEngine  } from'zego-express-whiteboard-web';
import ZEGO_WB from '~/gql/liveStream/zegoWhiteBoard.gql'
import {ZegoExpressDocs} from './ZegoExpressDocs'
// import ZegoExpress from './ZegoExpress'

export default {
  data() {
    return {
      token: '',
      isLogin : false,
      parentId : 'mywhiteboard',
      zgViewList : [],
      excelWBMap : {},
      // zgWbView,
      // zgDocsViewClient,
      // zgDocsView,
      // isRemote
    }
  },
 async created() {
      
  },
  methods: {
    leaveRoom() {
        this.isLogin = false;
        this.zg.logoutRoom();
    },
    async openRoom( roomID) {
      const zg = this.zg
      if (this.isLogin) {
        return leaveRoom();
      }
      if (!roomID) {
        alert('roomId is empty')
        return;
      }
      try {
        console.log("step 3.1 zego data is",this.zego,"e")
          await zg.loginRoom(roomID,this.zego.token,
            { userID: this.zego.userID, userName: this.zego.userName },
            { maxMemberCount: 3,  userUpdate: true  }
          )
        } catch (error) {
          console.log("error in login Room is");
        }
        console.log("step 3.2 after loginRoom")

    },

    // async getViewList(){
    //   try {
    //     list = await this.zg.getViewList();
    //     this.zgViewList = [];
    //     if (list && list.length) {
    //       // excel sheets 
    //       const map = {};
    //       let html = '';
    //       list.forEach(function(v) {
    //         const id = v.getID();
    //         const file = v.getFileInfo();
    //         if (file && file.fileType === 4) {
    //           const fileID = file.fileID;
    //           excelWBMap[fileID] = excelWBMap[fileID] || { _ids_: '' };
    //           excelWBMap[fileID][file.fileName] = v;
    //           excelWBMap[fileID]._ids_ += id + ',';
    //           if (map[fileID]) return;
    //           map[fileID] = true;
    //         }
    //         html += '<option value=' + id + '>' + id + '-' + v.getName() + '</option>';
    //         this.zgViewList.push(v);
    //       });
    //       document.getElementById('remoteView').innerHTML = '<option>--</option>' + html;
    //       console.log('docsview getViewList', excelWBMap);
    //     } else {
    //       document.getElementById('remoteView').innerHTML = '';
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async getViewList(){
    //     try {
    //         this.zgWbView = await zg.createView({
    //           roomID: document.getElementById("roomID").value,
    //           name: document.getElementById("whiteboardName").value,
    //           aspectWidth: Number(document.getElementById("aspectWidth").value),
    //           aspectHeight: Number(document.getElementById("aspectHeight").value),
    //         });
    //         await zg.attachView(this.zgWbView, parentId);
    //         this.zgViewList.push(this.zgWbView);
    //        this.zgDocsView = null;
    //       } catch (error) {
    //         console.log(error);
    //       }    
    // },
    // async createFileView(){
    //   try {
    //     const fileID = document.getElementById('fileID').value;
    //     const view = this.zgViewList.find(function(v) {
    //       const file = v.getFileInfo();
    //       return file && file.fileID === fileID;
    //     });
    //     if (view) {
    //       this.isRemote = true;
    //       this.zgWbView = view;
    //       this.zgDocsView = this.zgDocsViewClient.createView(this.parentId, view.getID(), view.getFileInfo().fileName);
    //       await this.zgDocsView.loadFile(fileID, '');
    //       return;
    //     }
    //     this.isRemote = false;
    //     this.zgDocsView = this.zgDocsViewClient.createView(this.parentId);
    //     await this.zgDocsView.loadFile(fileID, '').then(function(res) {
    //       const excelDom = document.getElementById('excelSheets');
    //       // Excel每个sheet都创建一个白板
    //       if (res.fileType == 4) {
            
    //         const sheets = res.file_list.map(function(v, i) {
    //           const name = v.file_name.replace(/.pdf/, "");
    //           if (i > 0) {
    //             const view = this.zgDocsViewClient.createView(this.parentId, '', name);
    //             view.loadFile(fileID, '');
    //           }
    //           return '<option value="' + name + '">' + name + '</option>';
    //         });
    //         if (!excelDom.innerHTML) {
    //           excelDom.innerHTML = sheets.join('');
    //         }
    //       } else {
    //         excelDom.innerHTML = '';
    //       }
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async previousPage(){
        this.zgWbView.scroll((this.zgWbView.getPage() - 2) / this.zgWbView.getPageCount(), 0);
      if (this.zgDocsView) {
        const page = this.zgDocsView.getCurrentPage();
        if (page > 1) this.zgDocsView.flipPage(page - 1);
      }
      // document.getElementById('curPage').value = this.zgWbView.getPage();
    },
    async nextPage(){
        this.zgWbView.scroll(this.zgWbView.getPage() / this.zgWbView.getPageCount(), 0);
      if (this.zgDocsView) {
        const page = this.zgDocsView.getCurrentPage();
        if (page < this.zgDocsView.getPageCount()) this.zgDocsView.flipPage(page + 1);
      }
      // document.getElementById('curPage').value = this.zgWbView.getPage();
    },
    async undo(){
              this.zgWbView.undo();
    },
    async redo(){
              this.zgWbView.redo();
    },
    async clear(){
              this.zgWbView.clear();
    },
    async path(){
              this.zgWbView.setToolType(1);
    },
    async text(){
             this.zgWbView.setToolType(2);
    },
    async line(){
              this.zgWbView.setToolType(4);
    },
    async rect(){
              this.zgWbView.setToolType(8);
    },
    async ellipse(){
              this.zgWbView.setToolType(16);
    },
    async selector(){
              this.zgWbView.setToolType(32);
    },
    async eraser(){
      this.zgWbView.setToolType(64);
    },
    // async selectRemoteView(target){
    //     const id = target.value;
    // if (id) {
    //   this.zgWbView = this.zgViewList.filter(function (v) {
    //     return id === v.getID();
    //   })[0];
    //   if (!this.zgWbView) {
    //     return;
    //   }
    //   const fileInfo = this.zgWbView.getFileInfo();
    //   if (fileInfo) {
    //     this.isRemote = true;
    //     this.zgDocsView = this.zgDocsViewClient.createView(this.parentId, id, fileInfo.fileName);
    //     await this.zgDocsView.loadFile(fileInfo.fileID, fileInfo.authKey);
    //     document.getElementById('fileID').value = fileInfo.fileID;
    //     console.log('docsview selectRemoteView', fileInfo.fileName, id);
    //   } else {
    //     this.zgDocsView = null;
    //     await this.zg.attachView(this.zgWbView, this.parentId);
    //   }
    //   document.getElementById('curPage').value = this.zgWbView.getPage();
    // }
    // console.log('selectRemoteView', id);
    // },
    // async onFileIdChange(){ 
    //   document.getElementById('fileID').value = target.value;
    // },
    

    async listen() {
      let zg = this.zg
      zg.on("error", (errorData) => {
          console.log("on error");
          console.log(errorData);
        });
        zg.on("viewAdd", (wbView) => {
          console.log("on viewAdd");
          console.log(wbView);
        });
        zg.on("viewRemoved", (whiteboardID) => {
          console.log("on viewRemoved");
          console.log(`whiteboardID: ${whiteboardID}`);
        });
        zg.on(
          "viewScroll",
          (whiteboardID, horizontalPercent, verticalPercent, page) => {
            console.log("on viewScroll");
            console.log(whiteboardID);
            console.log(horizontalPercent);
            console.log(verticalPercent);
            console.log(page);
            page && (document.getElementById('curPage').value = page);
          }
        );
        // this.zgDocsViewClient.on('onLoadFile', async function (res) {
        //   const { fileID, fileType, fileName, viewID, authKey, pageCount } = res;
        //   if (!this.isRemote) {
        //     zg.createView({
        //       roomID: document.getElementById('roomID').value,
        //       name: fileName,
        //       aspectWidth: Number(document.getElementById('aspectWidth').value),
        //       aspectHeight: Number(document.getElementById('aspectHeight').value),
        //       pageCount,
        //       fileInfo: { fileID, fileName, fileType, authKey }
        //     }).then(async function (view) {
        //       const flag = this.zgViewList.some(function (v) {
        //         const file = v.getFileInfo();
        //         return file && file.fileID === fileID;
        //       });
        //       if (!flag) {
        //         this.zgWbView = view;
        //         this.zgViewList.push(this.zgWbView);
        //         await zg.attachView(this.zgWbView, viewID);
        //       }
        //       // Excel Sheet
        //       if (fileType === 4) {
        //         excelWBMap[fileID] = excelWBMap[fileID] || { _ids_: '' };
        //         excelWBMap[fileID][fileName] = view;
        //         excelWBMap[fileID]._ids_ += view.getID() + ',';
        //       }
        //     });
        //   } else {
        //     // Excel Sheet
        //     if (fileType === 4) {
        //       excelWBMap[fileID] = excelWBMap[fileID] || { _ids_: '' };
        //       excelWBMap[fileID][fileName] = this.zgWbView;
        //       excelWBMap[fileID]._ids_ += this.zgWbView.getID() + ',';
        //     }
        //     await zg.attachView(this.zgWbView, viewID);
        //   }
        //   console.log('docsview onLoadFile', this.isRemote, fileName, excelWBMap, res);
        // })
    },

  // async  CreateZegoWhiteboardView(){
  //   const zegoWhiteboardView = await zegoExpressEngine.createView({
  //   roomID:'Login room number',
  //   name:'Whiteboard name',
  //   aspectWidth: 1600 * 5,
  //   aspectHeight: 900,
  //   pageCount: 5,
  //   fileInfo: {
  //       fileID:'File ID',
  //       fileName:'File name',
  //       fileType:'File Type',
  //       authKey:''
  //       }
  //     })
  //   },
  },
  async mounted() {
    //step -1 to get token
    console.log("step-1 get token")
    const zego = (this.zego =
      (
        await this.$apollo.query({
          query: ZEGO_WB,
        })
      ).data.zegoWhiteBoard || {})

      //create instance of zego ans assing to zg
    const zg = (this.zg = new ZegoExpressEngine(zego.appID, zego.server))
//set logs
    zg.setLogConfig({ logLevel: 3 })
    console.log("step-2 before ZegoExpressDocs")
//create instance of zego express docs
    this.zgDocsViewClient = new ZegoExpressDocs({
          appID: zego.appID,
          token: '',
          userID: zego.userID,
          isTestEnv: true 
        })
    
    console.log("step-3 before open room")

  // open room, return true if successful
      let loginSuc = false
      try {
          // loginSuc = await this.openRoom(this.$route.params.id)
          loginSuc = await this.openRoom("random")
      } catch (error) {
        console.error('Open Room...', error)
      }
      console.log("step-4")
    //function with have listeners
    this.listen()
    console.log("step-5")
  }
}
</script>

<style scoped>

</style>
