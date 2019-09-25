<template>
<Card>
    <Tree :data="data2" show-checkbox></Tree>
    <Button type="primary" style="margin-left:5px;" @click="test">编辑条件</Button>
</Card>

</template>
<script>
export default {
  data () {
    return {
      f: true,
      data2: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    test () {
      this.data2[0].children[1].children[0].expand = this.f = !this.f
    }
  }
}
</script>
