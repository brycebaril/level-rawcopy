var test = require("tape").test

var rawcopy = require("../")
var level = require("level-test")
var memdown = require("memdown")

var source1, target1, target2

test("populate source", function (t) {
  source1 = level("source1")()
  source1.put("abc", "def")
  source1.put("ghi", "jkl")
  source1.put("mno", "pqr")
  source1.put("stu", "vwx", function () {
    t.end()
  })
})

test("rawcopy", function (t) {
  target1 = level("target1")()

  rawcopy(source1, target1, function () {
    t.ok("callback called when done")
    t.end()
  })
})

test("check copy", function (t) {
  t.plan(4)
  source1.get("abc", function (err, val) {
    t.equals(val, "def")
  })
  source1.get("ghi", function (err, val) {
    t.equals(val, "jkl")
  })
  source1.get("mno", function (err, val) {
    t.equals(val, "pqr")
  })
  source1.get("stu", function (err, val) {
    t.equals(val, "vwx")
  })
})

test("unopened copy", function (t) {
  rawcopy(source1, "target2", {db: memdown}, function () {
    t.ok("callback called when done")
    t.end()
  })
})