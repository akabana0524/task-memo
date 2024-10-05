import { ref, watch } from "vue";

export type TagId = string;
export type TagName = string;
export type TagColor = string;

export interface Tag {
  id: TagId;
  name: TagName;
  color?: TagColor;
}
const tags = ref<Tag[]>([]);
watch(
  tags,
  (v) => {
    localStorage.setItem("tags", JSON.stringify(v));
  },
  { deep: true }
);

export function useTag() {
  function loadTags() {
    var tagsJson = localStorage.getItem("tags");
    if (tagsJson) {
      var _tags: Tag[] = JSON.parse(tagsJson);
      tags.value.splice(0, tags.value.length, ..._tags);
    }
  }
  function addBlankTag() {
    tags.value.push({
      id: crypto.randomUUID(),
      name: "",
    });
  }
  function deleteTag(tagId: TagId) {
    var index = tags.value.findIndex((v) => v.id == tagId);
    if (index != -1) {
      tags.value.splice(index, 1);
    }
  }
  return { tags, loadTags, addBlankTag, deleteTag };
}
