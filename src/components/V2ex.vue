<template>
<div>
     <form class="form-horizontal">
        <div class="form-group">
            <label for="user" class="col-xs-2 control-label">用户名</label>
                <div class="col-xs-6">
                    <input id="user" type="text" class="form-control" placeholder="用户名或电子邮箱">
                </div>
        </div>
        <div class="form-group">
            <label for="pwd" class="col-xs-2 control-label">密码</label>
            <div class="col-xs-6">
                <input id="pwd" type="text" class="form-control">
            </div>
        </div>
    </form>
</div>
</template>
<script>
export default {
  name: 'v2ex'
}
</script>