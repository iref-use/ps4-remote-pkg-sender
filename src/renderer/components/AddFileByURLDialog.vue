<template>
<el-dialog title="Add file by URL" :visible.sync="show">

    <el-form :inline="true" label-width="150px" label-position="left">
        <el-form-item label="Name">
          <el-input size="mini" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="CUSA">
          <el-input size="mini" v-model="form.cusa" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="URL">
          <el-input size="mini" v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Type">
          <el-select size="mini" v-model="form.region" placeholder="Type">
            <el-option label="Game" value="game"></el-option>
            <el-option label="Update" value="update"></el-option>
            <el-option label="Patch" value="patch"></el-option>
            <el-option label="DLC" value="dlc"></el-option>
            <el-option label="Backport" value="bp"></el-option>
            <el-option label="Backport 5.05" value="bp505"></el-option>
            <el-option label="Backport 6.72" value="bp672"></el-option>
            <el-option label="Backport 8.xx" value="bp8xx"></el-option>
          </el-select>
        </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="hide">Cancel</el-button>
      <el-button size="mini" type="primary" @click="add">Add</el-button>
    </span>

</el-dialog>
</template>

<script>
export default {
    name: 'AddFileByURLDialog',

    data(){ return {
        show: false,
        form: {
            name: '',
            url: '',
            cusa: '',
        }
    }},

    methods: {
        open(){ this.show = true },
        hide(){ this.show = false },
        toggle(){ this.show = !this.show },
        add(){
            // http://hb_store.test/cdn/stream.php?file=NPXX33392.pkg
            let file = this.$fs.createItemFromURL(this.form)

            let find = this.$store.getters['queue/isInQueue'](file)

            if(!find){
                file.status = 'in queue'
                this.$store.dispatch('queue/addToQueue', file)
            }
            else {
                if(file.status == 'serving')
                  file.status = 'in queue'

                this.$message({
                    message: file.name + ' is already in Queue',
                    type: 'warning'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.el-dialog {
    width: 550px;
}

.el-dialog__body {
    padding: 0 20px;
}

.el-form-item {
    margin-bottom: 10px;
}
</style>
