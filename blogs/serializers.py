from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUpload
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True, many=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()
        return exclusions

    def create(self, validated_data):
        categories = validated_data.pop('category_ids')
        post = Post.objects.create(**validated_data)
        for c in categories:
            post.category.add(c)
        return post

    def update(self, instance, validated_data):
        categories = validated_data.pop('category_ids')
        post = Post.objects.get(pk=instance.id)
        # Removing all categories and re adding again
        post.category.clear()
        for c in categories:
            post.category.add(c)

        return super(PostSerializer, self).update(instance, validated_data)




