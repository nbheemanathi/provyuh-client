import React from 'react'

export default function test() {
  return (
<div className="">
      <div className="border-b-2 mb-4 border-gray-200">
        <ul className="text-sm font-medium overflow-x-scroll flex flex-nowrap">
          <li className="pb-3 mr-6 last--mr-0">
            <Link
              to="/recipes"
              className="text-indigo-500 whitespace-nowrap outline-none"
              href="#0"
            >
              ← Back to Recipes
            </Link>
          </li>
          <li className="pb-3 mr-6 last--mr-0">
            <button className="text-indigo-500 font-medium whitespace-nowrap outline-none">
              Show Filter
            </button>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-2">
        <h2 className="text-xl mb-1 text-gray-500 font-bold">{mealType} Recipes</h2>
        {loading && <Spin />}
      </div>
      {!loading && (
        <div>
          <div className="text-sm text-gray-500 italic mb-4">
            {data?.getRandomRecipesOnLimit.totalResults} recipes
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col h-full lg:flex-row overflow-y-scroll">
            <div className="flex-1 h-auto">
              <div className="grid  transition-all ease-in gap-6 grid-cols-12">
                {data?.getRandomRecipesOnLimit.results.map((recipe) => (
                  <Tooltip key={recipe.id} title={recipe.title}>
                    <Card
                      hoverable
                      style={{ width: 300 }}
                      cover={<img alt="example" src={recipe.image} />}
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta title={recipe.title} description="This is the description" />
                    </Card>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
          {/* <List
            grid={{
              gutter: 30,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 5,
            }}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 20,
            }}
            dataSource={data?.getRandomRecipesOnLimit.results}
            renderItem={(item) => (
              <List.Item>
                <Tooltip title={item.title}>
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt="example" src={item.image} />}
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Meta title={item.title} description="This is the description" />
                  </Card>
                </Tooltip>
              </List.Item>
            )}
          /> */}
        </div>
      )}
    </div>  )
}
